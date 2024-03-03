document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("signatureCanvas");
    const ctx = canvas.getContext("2d");
    const downloadBtn = document.getElementById("downloadBtn");
    const downloadBtnTransparent = document.getElementById("downloadBtnTransparent");
    const clearBtn = document.getElementById("clearBtn");

    let isDrawing = false;

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);

    canvas.addEventListener("touchstart", startDrawingTouch);
    canvas.addEventListener("touchmove", drawTouch);
    canvas.addEventListener("touchend", stopDrawing);

    clearBtn.addEventListener("click", clearSignature);

    function startDrawing(e) {
        isDrawing = true;
        draw(e);
    }

    function draw(e) {
        e.preventDefault();

        if (isDrawing) {
            const { clientX, clientY } = e;
            const rect = canvas.getBoundingClientRect();
            const x = clientX - rect.left;
            const y = clientY - rect.top;

            drawOnCanvas(x, y);
        }
    }

    function startDrawingTouch(e) {
        isDrawing = true;
        const touch = e.touches[0];
        const { clientX, clientY } = touch;
        const rect = canvas.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        drawOnCanvas(x, y);
    }

    function drawTouch(e) {
        e.preventDefault();

        if (isDrawing) {
            const touch = e.touches[0];
            const { clientX, clientY } = touch;
            const rect = canvas.getBoundingClientRect();
            const x = clientX - rect.left;
            const y = clientY - rect.top;

            drawOnCanvas(x, y);
        }
    }

    function stopDrawing() {
        isDrawing = false;
        ctx.beginPath();
    }

    function drawOnCanvas(x, y) {
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.strokeStyle = "#000";

        if (!ctx.beginPathCalled) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.beginPathCalled = true;
        }

        ctx.lineTo(x, y);
        ctx.stroke();
    }

    function clearSignature() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function downloadImage(transparent) {
        const dataUrl = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = transparent ? "signature_transparent.png" : "signature_with_background.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    downloadBtn.addEventListener("click", function () {
        downloadImage(false);
    });

    downloadBtnTransparent.addEventListener("click", function () {
        downloadImage(true);
    });
});
