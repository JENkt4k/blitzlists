document.addEventListener('DOMContentLoaded', function () {
    const btnScanQR = document.getElementById('btn-scan-qr');
    const qrScannerPopup = document.getElementById('qr-scanner-popup');
    const btnCloseScanner = document.getElementById('btn-close-scanner');
    let html5QrCode;


    btnScanQR.addEventListener('click', () => {
        html5QrCode = new Html5Qrcode("qr-reader");
        const peer = new Peer();

        qrScannerPopup.style.display = 'block';
        html5QrCode = new Html5Qrcode("qr-reader");
        html5QrCode.start(
            { facingMode: "environment" },
            {
                fps: 10,
                qrbox: 250
            },
            qrCodeMessage => {
                // Handle the scanned code

                console.log(`QR Code detected: ${qrCodeMessage}`);
                const conn = peer.connect(qrCodeMessage);


                conn.on('open', () => {
                    console.log('Connection to peer opened');
                    conn.send('Hello from the other peer!'); // Sending a message to the connected peer
                });

                // Listen for incoming connections
                peer.on('connection', (conn) => {

                    document.getElementById('send-msg-btn').addEventListener('click', () => {
                        if (conn && conn.open) {
                            conn.send('Your message here');
                        } else {
                            console.log('Connection not established or not open.');
                        }
                    });

                    conn.on('data', (data) => {
                        // Handle received data
                        console.log('Received:', data);
                    });

                    conn.on('open', () => {
                        conn.send('Hello from the other peer!');
                    });
                });

                conn.on('data', (data) => {
                    console.log('Received data from peer:', data); // Receiving data from the connected peer
                });

                conn.on('error', (err) => {
                    console.error('Connection error:', err);
                });
                html5QrCode.stop().then(() => {
                    qrScannerPopup.style.display = 'none';
                }).catch(err => {
                    console.error('Problem stopping QR scanner', err);
                });
            },
            errorMessage => {
                // parse error, ignore it. continuous camera feed
            })
            .catch(err => {
                console.error('Unable to start QR scanner', err);
            });
    });

    btnCloseScanner.addEventListener('click', () => {
        if (html5QrCode) {
            html5QrCode.stop().then(() => {
                qrScannerPopup.style.display = 'none';
            }).catch(err => {
                console.error('Problem stopping QR scanner', err);
            });
        }
    });

});

