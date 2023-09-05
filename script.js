window.addEventListener("load", () => {

    let video;
    let detector;
    let detectionInterval;
    let detectionTime = 15 * 1000; // 15 seconds in milliseconds
    let dt = 15;
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
                dtc = setInterval( function() {
                    // resolve(humanCount);
                    document.getElementById('timer').innerText = `Time remaining: ${dt} seconds`;
                    dt--;
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
    else{
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
                alert(x);
                if (x > 1) {
                    cam_test_pass = false;
                    Swal.fire({
                        title: "Error!",
                        text: "More than one person detected! Try again!",
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                }

              
            } else if (result.isDismissed === Swal.DismissReason.cancel) {
              Swal.fire('You clicked No.', '', 'info');
            }})
    
    }
    else{
    Swal.fire({
        title: "Error!",
        text: "Kindly complete the previous steps!",
        icon: "error",
        confirmButtonText: "OK",
    });
}

    
}
// four.onclick = function () {
//     if (three_selected) {
//         four_selected = true
//         one.classList.add("active");
//         two.classList.add("active");
//         three.classList.add("active");
//         four.classList.add("active");
//     }
//     Swal.fire({
//         title: "Hello!",
//         text: "This is a SweetAlert pop-up!",
//         icon: "info",
//         confirmButtonText: "OK",
//     });
// }
});