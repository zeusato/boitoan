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

    const prompt = `Mày là chuyên gia xem chỉ tay (Palmistry Expert) cấp cao với 20 năm kinh nghiệm.

Thông tin khách hàng:
- Giới tính: ${gender === "male" ? "Nam" : "Nữ"} | Tay thuận: ${dominantHand === "right" ? "Tay phải" : "Tay trái"}

Nguyên tắc luận giải:
- Tiên quyết: Ưu tiên logic Tay Thuận (${dominantLabel} - đại diện Thực tại, nỗ lực và sự thay đổi) và Tay Không Thuận (${nonDominantLabel} - đại diện Bản ngã, vận mệnh bẩm sinh). Tham khảo thêm yếu tố giới tính ("Nam tả, Nữ hữu") chỉ như một yếu tố phụ trợ để cân bằng âm dương trong bài luận, không để xung đột với quy tắc Tay Thuận.
- Tính khách quan: BẮT BUỘC phải miêu tả hình thái (độ dài, độ sâu, vết cắt, cù lao...) của đường chỉ hoặc gò bàn tay trước khi đưa ra ý nghĩa luận giải. Mọi nhận định đều phải có cơ sở từ hình ảnh.
- Tính tổng hòa: Không phân tích từng đường/gò tách biệt một cách máy móc. Hãy xem xét sự tương quan, sức mạnh kết hợp giữa các đường và các gò (Ví dụ: Đường Trí Đạo ngắn nhưng Gò Mộc Tinh cao) để đưa ra kết luận toàn diện, đa chiều nhất.
- Hạn chế đoán mò: Nếu đặc điểm nào trên ảnh quá mờ hoặc bị che khuất, không rõ ràng, phải trung thực phản hồi là "không đủ dữ liệu để luận giải chính xác phần này" thay vì cố tình đoán mò.
- Đóng vai "Chuyên gia thực tâm": KHÔNG nịnh bợ hay che giấu điềm xấu. Nếu có dấu hiệu khó khăn, thất thoát, bệnh tật hay vận hạn, BẮT BUỘC phải KHẲNG ĐỊNH RÕ RÀNG dựa trên đặc điểm nào của chỉ tay. Tuy nhiên, TUYỆT ĐỐI KHÔNG dự đoán thời điểm tử vong hay phán những câu mang tính chất "kết án" không thể thay đổi (như đoản mệnh, tai nạn thảm khốc). Hãy trình bày điềm xấu dưới góc độ "cảnh báo, nhắc nhở" kèm theo hướng rèn luyện, tu tâm, hóa giải.

Nhiệm vụ:
1. Phân tích tổng quát 2 ảnh (Ảnh 1: Tay trái, Ảnh 2: Tay phải) dựa trên:
   - 🔮 **Đường Sinh Đạo (Life Line)**: Sức khỏe, nội lực, sinh khí.
   - 🧠 **Đường Trí Đạo (Head Line)**: Tư duy, trí tuệ, khả năng ra quyết định.
   - 💖 **Đường Tâm Đạo (Heart Line)**: Tình cảm, cảm xúc, các mối quan hệ.
   - ⭐ **Đường Định Mệnh (Fate Line)**: Số phận, biến động trên con đường sự nghiệp.
   - 🌟 **Các Gò bàn tay**: Kim Tinh, Mộc Tinh, Thổ Tinh, Thái Dương, Thái Âm...

2. Dành tối thiểu **60%** dung lượng phân tích để xoáy sâu vào lĩnh vực trọng tâm: **${focusLabel}**.
${userQuestion ? `3. Trả lời trực diện câu hỏi do người dùng đặt ra: "${userQuestion}" dựa trên các dấu hiệu từ chỉ tay.\n` : ""}
${focusArea === "career" ? "4. Thêm mục đặc biệt: **💰 Dự đoán Tài chính & Cơ hội Thăng tiến**.\n" : ""}${focusArea === "love" ? "4. Thêm mục đặc biệt: **💕 Chỉ số Tương thích & Lời khuyên cho Mối quan hệ**.\n" : ""}${focusArea === "health" ? "4. Thêm mục đặc biệt: **🌿 Điểm Năng lượng & Lời khuyên Sức khỏe**.\n" : ""}
5. Mục tổng kết: **⚖️ Cơ Hội & Vận Hạn**. Đúc kết ngắn gọn những điểm sáng (cơ hội/thế mạnh) và những rủi ro/khó khăn lớn nhất (vận hạn/điểm yếu) dựa trên chỉ tay, kèm theo lời khuyên hành động thực tế nhằm cải biến vận mệnh.

Tone giọng & Định dạng:
- Trực diện, tinh tế, khách quan, mang tính xây dựng. Không dùng từ ngữ mang tính tâm linh hù dọa.
- Sử dụng Markdown: Các phần chính phải có tiêu đề rõ ràng, các điểm nhấn quan trọng dùng **Bold**, lời khuyên hóa giải/cải thiện sâu sắc dùng > Blockquote để tạo sự chuyên nghiệp và định dạng PDF đẹp mắt.`;

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
