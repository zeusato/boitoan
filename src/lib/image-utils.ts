/**
 * Nén và resize ảnh từ base64
 */
export async function compressImage(
    base64Str: string,
    maxWidth: number = 1200,
    maxHeight: number = 1200,
    quality: number = 0.8
): Promise<string> {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = base64Str;
        img.onload = () => {
            const canvas = document.createElement("canvas");
            let width = img.width;
            let height = img.height;

            // Tính toán tỷ lệ resize
            if (width > height) {
                if (width > maxWidth) {
                    height *= maxWidth / width;
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width *= maxHeight / height;
                    height = maxHeight;
                }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            if (!ctx) {
                resolve(base64Str);
                return;
            }

            ctx.drawImage(img, 0, 0, width, height);

            // Chuyển sang JPEG với chất lượng được chỉ định
            const compressedBase64 = canvas.toDataURL("image/jpeg", quality);
            resolve(compressedBase64);
        };
        img.onerror = (error) => {
            console.error("Lỗi nén ảnh:", error);
            resolve(base64Str); // Trả về ảnh gốc nếu lỗi
        };
    });
}
