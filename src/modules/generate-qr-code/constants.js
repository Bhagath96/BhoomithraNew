export const STATE_REDUCER_KEY = 'generateQRCode';

export const REQUEST_STATUS = {
    SUCCESS: 'SUCCESS',
    FAILED: 'FAILED'
};

export const QR_CONFIG = {
    /**
     * FIT: QR Code size                        // Default 120
     * FOREGROUND: QR Code Color                // Default null
     * BACKGROUND: QR Code Background Color     // Default null
     */
    A4: { COUNT_PER_ROW: 7, FIT: 120, FOREGROUND: null, BACKGROUND: null },
    A3: { COUNT_PER_ROW: 10 }
};

export const PAGE_SIZE = {
    A4: 'A4',
    A3: 'A3'
};
