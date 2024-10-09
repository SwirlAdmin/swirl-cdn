var ssv13_videoDataArray = [];
var ssv13_currentVideoTimer = null;

function generateUUIDssv13() {
    var d = new Date().getTime();
    var d2 =
        (typeof performance !== "undefined" &&
            performance.now &&
            performance.now() * 1e3) ||
        0;
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = Math.random() * 16;
        if (d > 0) {
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === "x" ? r : (r & 3) | 8).toString(16);
    });
}

function getDeviceTypessv13() {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 767) {
        return "Mobile";
    } else if (screenWidth >= 768 && screenWidth <= 1024) {
        return "Tablet";
    } else {
        return "Desktop";
    }
}

async function initializeVideoDatassv13(videoId, videoUrl, playlist) {
    let viewCounted = false;
    const existingVideoData = ssv13_videoDataArray.find((data) => data.id === videoId);
    const swirlData = localStorage.getItem("ssv13_responseData");
    const allDataofSwirls = JSON.parse(swirlData);
    const videoElement = document.getElementById(videoId);
    const videoData = existingVideoData || {
        id: videoId,
        url: videoUrl,
        unique_views: 0,
        watch_time: 0,
        brand_id: allDataofSwirls.swirls.customization.brand_id,
        total_views: 0,
        duration: allDataofSwirls?.swirls[playlist]?.find((el) => {
            return el.server_url == videoUrl;
        })?.video_len,
        video_title: allDataofSwirls?.swirls[playlist]?.find((el) => {
            return el.server_url == videoUrl;
        })?.video_title,
        drop_of_point: [],
        skip_points: [],
        segments: [],
        location_details: {},
        system_detail: {
            swirl_machine_id: generateUUIDssv13(),
            device_type: getDeviceTypessv13(),
        },
    };

    initializeSegmentssv13(videoData);

    if (ssv13_currentVideoTimer) {
        clearInterval(ssv13_currentVideoTimer);
    }

    if (existingVideoData) {
        videoData.watch_time = parseInt(existingVideoData.watch_time || 0, 10);
    }

    videoElement.addEventListener("timeupdate", () => {
        const currentTime = Math.floor(videoElement.currentTime);
        const currentSegment = videoData.segments.find(
            (segment) => currentTime >= segment.start && currentTime <= segment.end
        );
        if (currentTime != 0 && !viewCounted) {
            videoData.unique_views = 1;
            videoData.total_views += 1;
            viewCounted = true;
            localStorage.setItem("_all_video_data", JSON.stringify(ssv13_videoDataArray));
        }
    });

    ssv13_currentVideoTimer = setInterval(() => {
        if (!videoElement.paused) {
            tenPercent = Math.floor(videoData.duration * 0.1);
            videoData.watch_time += 1;
            localStorage.setItem("_all_video_data", JSON.stringify(ssv13_videoDataArray));
        }
    }, 1e3);

    videoElement.addEventListener("pause", () => {
        const currentTime = Math.floor(videoElement.currentTime);
        const currentSegment = videoData.segments.find(
            (segment) => currentTime >= segment.start && currentTime <= segment.end
        );
        if (currentSegment) {
            videoData.drop_of_point.push({
                segment_id: currentSegment.segment_id,
                timestamp: currentTime,
            });
            localStorage.setItem("_all_video_data", JSON.stringify(ssv13_videoDataArray));
        }
    });

    videoElement.addEventListener("ended", () => {
        const currentTime = Math.floor(videoElement.currentTime);
        const currentSegment = videoData.segments.find(
            (segment) => currentTime >= segment.start && currentTime <= segment.end
        );
        if (currentSegment) {
            videoData.drop_of_point.push({
                segment_id: currentSegment.segment_id,
                timestamp: currentTime,
            });
            localStorage.setItem("_all_video_data", JSON.stringify(ssv13_videoDataArray));
        }
    });

    videoElement.addEventListener("seeked", () => {
        const skipTime = Math.floor(videoElement.currentTime);
        const currentSegment = videoData.segments.find(
            (segment) => skipTime >= segment.start && skipTime <= segment.end
        );
        if (currentSegment) {
            if (
                videoData?.skip_points.length == 0 ||
                videoData.skip_points[videoData.skip_points.length - 1].to
            ) {
                videoData.skip_points.push({
                    from: { segmentId: currentSegment.segmentId, timeStamp: skipTime },
                    to: null,
                });
            } else {
                videoData.skip_points[videoData.skip_points.length - 1].to = {
                    segmentId: currentSegment?.segmentId,
                    timeStamp: skipTime,
                };
            }
            localStorage.setItem("_all_video_data", JSON.stringify(ssv13_videoDataArray));
        }
    });
    if (existingVideoData) {
        Object.assign(existingVideoData, videoData);
    } else {
        ssv13_videoDataArray.push(videoData);
    }
}

function initializeSegmentssv13(videoData) {
    const segmentDuration = 3;
    for (let i = 0; i < Math.ceil(videoData.duration / segmentDuration); i++) {
        videoData.segments.push({
            segment_id: i + 1,
            start: i * segmentDuration,
            end: Math.min((i + 1) * segmentDuration, videoData.duration),
        });
    }
}

function pushAnalyticsdatassv13() {
    substring_to_remove = "ssv13-video-m-";
    const analyticsData = JSON.parse(localStorage.getItem("_all_video_data"));
    const updatedData = analyticsData?.map(async (i) => {
        i.video_id = i.id.replace(substring_to_remove, "");
        return i;
    });
    if (updatedData.length > 0) {
        Promise.all(updatedData)
            .then(async (modifiedData) => {
                // Sending data to the server
                await fetch("https://goswirl.world:3001/insertVideoData", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ payloads: modifiedData }), // Stringify the object
                })
                    .then((response) => {
                        ssv13_videoDataArray = [];
                        if (!response.ok) {
                            throw new Error("Network response was not ok");
                        }
                        // Clear the data from local storage if successfully sent
                        localStorage.removeItem("_all_video_data");
                    })
                    .catch((error) => {
                        console.error("Error sending data:", error);
                    });
            })
            .catch((err) => console.log(err));
    }
}

async function impressionCountssv13(brand_id, playlistCode, videoidsArray) {
    let p = playlistCode;
    let cl = window.location.href.split("?")[0];
    // Check if UUID exists in localStorage and if it's still valid
    const uuid = localStorage.getItem("uuid");
    const timestamp = localStorage.getItem("timestamp");
    if (uuid && timestamp) {
        const currentTime = new Date().getTime();
        // Convert 4 hours to milliseconds
        const expirationTime = 4 * 60 * 60 * 1000;
        // const expirationTime = 1000;
        if (currentTime - parseInt(timestamp, 10) < expirationTime) {
            // UUID is still valid, use it
            console.log("Using existing UUID:", uuid);
            // You can call your API here using the existing UUID
            return;
        }
    }
    // Generate new UUID
    const newUUID = generateUUIDssv13();
    // Save UUID and current timestamp in localStorage
    localStorage.setItem("uuid", newUUID);
    localStorage.setItem("timestamp", new Date().getTime().toString());
    brand_id = brand_id;
    let payload = {
        id: newUUID,
        playlist: playlistCode || "",
        current_url: cl,
        brand_id,
        video_ids: videoidsArray,
    };
    await fetch("https://goswirl.world:3001/insertImpression", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ impressionData: payload }), // Stringify the object
    }).then((response) => {
        // console.log("67----", response);
    }).catch((error) => {
        console.error("Error sending data:", error);
    });
}

window.addEventListener("unload", () => {
    const analyticsDataString = localStorage.getItem("_all_video_data");
    const substring_to_remove = "ssv13-video-m-";
    if (analyticsDataString) {
        try {
            const analyticsData = JSON.parse(analyticsDataString);
            localStorage.removeItem("_all_video_data");
            const updatedData = analyticsData?.map(async (i) => {
                i.video_id = i.id.replace(substring_to_remove, "");
                return i;
            });
            if (updatedData) {
                try {
                    const success = navigator.sendBeacon(
                        "https://goswirl.world:3001/insertVideoDataOnWindowclose",
                        JSON.stringify(analyticsData)
                    );
                    if (!success) {
                        throw new Error("Beacon transmission failed");
                    }
                    localStorage.removeItem("_all_video_data");
                } catch (error) {
                    console.error("Error sending data:", error);
                }
            }
        } catch (error) {
            localStorage.removeItem("_all_video_data");
            console.error("Error parsing analytics data:", error);
        }
    }
});