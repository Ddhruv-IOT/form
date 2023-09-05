window.addEventListener("load", () => {

    // const fullscreenButton = document.getElementById('fullscreen-button');
    const elementToMakeFullscreen = document.getElementById('body');

    let video;
    let detector;
    let detectionInterval;
    let detectionTime = 15 * 1000; // 15 seconds in milliseconds
    let dt = 12;
    let humanCount = 0;

    // document.getElementById('webcam').style.display = 'none';
    document.getElementById('timer').style.display = 'none';
    document.getElementById('fnn').style.display = 'none';

    async function setupCamera() {
        video = document.getElementById('webcam');
        const stream = await navigator.mediaDevices.getUserMedia({ 'audio': false, 'video': true });
        video.srcObject = stream;

        return new Promise((resolve) => {
            video.onloadedmetadata = () => {
                resolve(video);
            };
        });
    }

    async function loadDetector() {
        detector = await cocoSsd.load();
    }

    async function detectHuman() {
        const predictions = await detector.detect(video);
        humanCount = predictions.filter(prediction => prediction.class === 'person').length;
        document.getElementById('fnn').innerText = `Number of humans detected: ${humanCount}`;
        return humanCount;
    }

    function startDetection() {
        return new Promise(async (resolve) => {
            loadDetector().then(() => {
                setupCamera().then(async (video) => {
                    video.play();
                    detectionInterval = setInterval(async () => {
                        const humanCount = await detectHuman();
                    }, 1000); // Run detection every second
                    dtc = setInterval(function () {
                        // resolve(humanCount);
                        document.getElementById('timer').innerText = `Time remaining: ${dt} seconds`;
                        if (dt > 0) {
                            dt--;
                        }
                    }, 1000);

                    setTimeout(() => {
                        clearInterval(detectionInterval);
                        clearInterval(dtc);
                        resolve(humanCount);
                        video.srcObject.getTracks().forEach(track => track.stop()); // Stop video stream
                        humanCount = document.getElementById('fnn').innerText.split(' ')[4];
                        document.getElementById('webcam').style.display = 'none';
                        document.getElementById('timer').style.display = 'none';
                        document.getElementById('fnn').style.display = 'none';
                    }, detectionTime);
                });
            });
        });
    }

    const one = document.querySelector(".one");
    const two = document.querySelector(".two");
    const three = document.querySelector(".three");
    const four = document.querySelector(".four");


    let one_selected = false
    let two_selected = false
    let three_selected = false
    let four_selected = false

    let cam_test_pass = false

    one.onclick = function () {
        Swal.fire({
            title: "Permission Required!",
            text: "Kindly allow full scrren mode!",
            icon: "info",
            confirmButtonText: "Okay",
        }).then((result) => {
            if (result.isConfirmed) {
                // document.documentElement.requestFullscreen();
                if (elementToMakeFullscreen.requestFullscreen) {
                    elementToMakeFullscreen.requestFullscreen();
                } else if (elementToMakeFullscreen.mozRequestFullScreen) { // Firefox
                    elementToMakeFullscreen.mozRequestFullScreen();
                } else if (elementToMakeFullscreen.webkitRequestFullscreen) { // Chrome, Safari, and Opera
                    elementToMakeFullscreen.webkitRequestFullscreen();
                } else if (elementToMakeFullscreen.msRequestFullscreen) { // IE/Edge
                    elementToMakeFullscreen.msRequestFullscreen();
                }
            }
        })
        one_selected = true
        one.classList.add("active");
        two.classList.remove("active");
        three.classList.remove("active");
        four.classList.remove("active");
    }

    two.onclick = function () {
        if (one_selected) {
            
            two_selected = true
            one.classList.add("active");
            two.classList.add("active");
            three.classList.remove("active");
            four.classList.remove("active");
        }
        else {
            Swal.fire({
                title: "Warning!",
                text: "Kindly First confirm that you are in a safe place!",
                icon: "warning",
                confirmButtonText: "Okay",
            });
        }
    }
    three.onclick = function () {
        if (two_selected) {

            x = Swal.fire({
                title: "info",
                text: "Kindly allow the camera permissions to access your camera!, We won't store any data!",
                icon: "info",
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    three_selected = true;
                    one.classList.add("active");
                    two.classList.add("active");
                    three.classList.add("active");
                    four.classList.remove("active");
                    document.getElementById('timer').style.display = 'block';
                    document.getElementById('fnn').style.display = 'block';
                    x = await startDetection();
                    // alert(x);
                    if (x > 1) {
                        cam_test_pass = false;
                        Swal.fire({
                            title: "Error!",
                            text: "More than one person detected! Try again!",
                            icon: "error",
                            confirmButtonText: "OK",
                        });
                    }
                    else {
                        cam_test_pass = true;
                        one.classList.add("active");
                        two.classList.add("active");
                        three.classList.add("active");
                        four.classList.add("active");

                        document.getElementById('result').innerHTML = `
                                <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfY8J49KTT4ASEtgAQa5tTCiQg_WAVYPLMVc5auPy6voEZvmA/viewform?embedded=true" width="640" height="425" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
                            `;


                    }

                } else if (result.isDismissed === Swal.DismissReason.cancel) {
                    Swal.fire('You clicked No.', '', 'info');
                }
            })

        }
        else {
            Swal.fire({
                title: "Error!",
                text: "Kindly complete the previous steps!",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    }
});