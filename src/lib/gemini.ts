import { GoogleGenerativeAI } from "@google/generative-ai";
import type { FocusArea } from "@/store/usePalmStore";

const FOCUS_LABELS: Record<FocusArea, string> = {
    general: "Tổng quan tất cả các phương diện",
    career: "Sự nghiệp & Tiền tài",
    love: "Tình duyên & Hôn nhân",
    health: "Sức khỏe & Năng lượng",
};

function buildPrompt(
    gender: "male" | "female",
    dominantHand: "left" | "right",
    focusArea: FocusArea,
    userQuestion: string
): string {
    const focusLabel = FOCUS_LABELS[focusArea];
    const nonDominantLabel =
        dominantHand === "right" ? "tay trái" : "tay phải";
    const dominantLabel =
        dominantHand === "right" ? "tay phải" : "tay trái";

    let prompt = `Mày là chuyên gia xem chỉ tay (Palmistry Expert) cấp cao với 20 năm kinh nghiệm.

Thông tin khách hàng:
- Giới tính: ${gender === "male" ? "Nam" : "Nữ"}
- Tay thuận: ${dominantHand === "right" ? "Tay phải" : "Tay trái"}.

Logic phân tích:
- Áp dụng nguyên tắc "Nam tả, Nữ hữu" sao cho phù hợp, dựa vào giới tính ${gender === "male" ? "Nam" : "Nữ"} này.
- ${nonDominantLabel.charAt(0).toUpperCase() + nonDominantLabel.slice(1)} (tay KHÔNG thuận) đại diện cho vận mệnh bẩm sinh, tiềm năng sẵn có từ khi sinh ra.
- ${dominantLabel.charAt(0).toUpperCase() + dominantLabel.slice(1)} (tay thuận) đại diện cho thực tại, nỗ lực và những thay đổi hiện tại do bản thân tạo nên.

Lĩnh vực trọng tâm mà người dùng muốn tập trung: **${focusLabel}**.
${userQuestion ? `\nCâu hỏi cụ thể của người dùng: "${userQuestion}"` : ""}

Yêu cầu phân tích:
1. Phân tích tổng quát 2 bàn tay dựa trên:
   - 🔮 **Đường Sinh Đạo (Life Line)**: Sức khỏe, tuổi thọ, sinh lực.
   - 🧠 **Đường Trí Đạo (Head Line)**: Tư duy, trí tuệ, sự nghiệp.
   - 💖 **Đường Tâm Đạo (Heart Line)**: Tình cảm, các mối quan hệ.
   - ⭐ **Đường Định Mệnh (Fate Line)**: Số phận, con đường sự nghiệp (nếu có).
   - 🌟 **Các Gò bàn tay**: Kim Tinh, Mộc Tinh, Thổ Tinh, Thái Dương, Thái Âm...

2. Dành tối thiểu **60%** dung lượng phân tích để xoáy sâu vào lĩnh vực trọng tâm: **${focusLabel}**.
${userQuestion ? `3. Trả lời trực diện câu hỏi "${userQuestion}" dựa trên các dấu hiệu từ chỉ tay.\n` : ""}
${focusArea === "career" ? "4. Thêm mục đặc biệt: **💰 Dự đoán Tài chính & Cơ hội Thăng tiến**.\n" : ""}${focusArea === "love" ? "4. Thêm mục đặc biệt: **💕 Chỉ số Tương thích & Lời khuyên cho Mối quan hệ**.\n" : ""}${focusArea === "health" ? "4. Thêm mục đặc biệt: **🌿 Điểm Năng lượng & Lời khuyên Sức khỏe**.\n" : ""}
Tone giọng: Khách quan, trung thực, tinh tế nhưng ĐI THẲNG VÀO VẤN ĐỀ. 
- QUAN TRỌNG: TUYỆT ĐỐI KHÔNG NỊNH BỢ người dùng, KHÔNG sáo rỗng hay thêm thắt những lời tốt đẹp nếu chỉ tay không thể hiện điều đó.
- CƠ SỞ LUẬN GIẢI: Mọi nhận định, dự đoán đều PHẢI nói rõ dựa trên đặc điểm cụ thể nào của bàn tay (Ví dụ: "Đường Tâm Đạo đứt đoạn cho thấy...", "Gò Thái Dương xẹp cho thấy..."). Bắt buộc phải miêu tả hình dáng/tình trạng của đường chỉ tay/gò bàn tay trước khi đưa ra kết luận.

Định dạng trả về: Markdown sạch sẽ với các tiêu đề rõ ràng, sử dụng emoji phù hợp. Phần trọng tâm phải được bôi đậm hoặc đặt trong blockquote nổi bật.

QUAN TRỌNG: Phân tích 2 ảnh đính kèm. Ảnh 1 là tay trái, Ảnh 2 là tay phải.`;

    return prompt;
}

export async function testConnection(apiKey: string): Promise<{ success: boolean; model: string; error?: string }> {
    try {
        const genAI = new GoogleGenerativeAI(apiKey);

        // Try to list models and find the best one
        const modelsToTry = [
            "gemini-3.1-pro-preview",
            "gemini-3-flash-preview",
            "gemini-2.5-flash",
            "gemini-2.0-flash",
        ];

        for (const modelName of modelsToTry) {
            try {
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent("Nói 'Xin chào' trong 5 từ.");
                const text = result.response.text();
                if (text) {
                    return { success: true, model: modelName };
                }
            } catch {
                continue;
            }
        }
        return { success: false, model: "", error: "Không tìm thấy model khả dụng." };
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Lỗi không xác định";
        return { success: false, model: "", error: message };
    }
}

export async function analyzePalm(
    apiKey: string,
    leftHandBase64: string,
    rightHandBase64: string,
    gender: "male" | "female",
    dominantHand: "left" | "right",
    focusArea: FocusArea,
    userQuestion: string
): Promise<string> {
    const genAI = new GoogleGenerativeAI(apiKey);

    // Try models in order
    const modelsToTry = [
        "gemini-3.1-pro-preview",
        "gemini-3-flash-preview",
        "gemini-2.5-flash",
        "gemini-2.0-flash",
    ];

    const prompt = buildPrompt(gender, dominantHand, focusArea, userQuestion);

    // Strip base64 prefix if present
    const cleanBase64 = (b64: string) => b64.replace(/^data:image\/\w+;base64,/, "");

    const imageParts = [
        {
            inlineData: {
                mimeType: "image/jpeg",
                data: cleanBase64(leftHandBase64),
            },
        },
        {
            inlineData: {
                mimeType: "image/jpeg",
                data: cleanBase64(rightHandBase64),
            },
        },
    ];

    for (const modelName of modelsToTry) {
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent([prompt, ...imageParts]);
            const text = result.response.text();
            if (text) return text;
        } catch {
            continue;
        }
    }
    throw new Error("Không thể phân tích. Vui lòng kiểm tra API Key và thử lại.");
}
