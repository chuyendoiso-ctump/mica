(function () {
    const micaComponent = document.getElementById('mica-program-component');
    if (!micaComponent) return;

    const menus = [
        { id: 'bao-cao-vien', label: 'Chủ tọa & Báo cáo viên' },
        { id: 'tong-quan', label: 'Chương trình tổng quan' },
        { id: 'chi-tiet', label: 'Chương trình chi tiết' },
        { id: 'don-vi-tai-tro', label: 'Đơn vị tài trợ' },
        { id: 'ca-lam-sang', label: 'Ca lâm sàng trực tiếp' },
        { id: 'mau-slide', label: 'Mẫu Slide' },
        // { id: 'tai-chuong-trinh', label: 'Tải chương trình' },
        { id: 'tai-tai-lieu', label: 'Tải tài liệu' }
    ];

    let activeMenuId = 'tong-quan';
    let activeHall = 'all'; // Đổi mặc định thành "Tất cả" khi vào chương trình chi tiết
    let searchQuery = '';   // Biến lưu trữ từ khóa tìm kiếm

    // Thông tin màu sắc và tên hiển thị cho các thẻ Nhãn (Badge) định vị
    const hallInfo = {
        'can-tho': { name: 'HT Cần Thơ', color: '#1d4ed8', bg: '#dbeafe', border: '#bfdbfe' }, // Xanh dương
        'hau-giang': { name: 'HT Hậu Giang', color: '#047857', bg: '#d1fae5', border: '#a7f3d0' }, // Xanh lá
        'soc-trang': { name: 'HT Sóc Trăng', color: '#b45309', bg: '#fef3c7', border: '#fde68a' },  // Vàng cam
        'goc-giao-luu-mica': { name: 'Góc giao lưu MICA', color: '#a609b4ff', bg: '#fef3c7', border: '#fde68a' }  // Vàng cam
    };

    // Dữ liệu chi tiết trích xuất từ CSV
    const detailedData = {
        "can-tho": [
            {
                "time": "08:00 - 08:30",
                "title": "LỄ KHAI MẠC / OPENING CEREMONY",
                "chairs": "",
                "talks": []
            },
            {
                "time": "08:30 - 09:58",
                "title": "KỶ NGUYÊN BÓNG PHỦ THUỐC TRONG CAN THIỆP MẠCH VÀNH",
                "chairs": "PGs.Ts. Hồ Thượng Dũng - Gs.Ts. Hoàng Anh Tiến - PGs.Ts. Nguyễn Văn Tân - PGs.Ts. Hồ Anh Bình - BsCKII. Lý Ích Trung",
                "talks": [
                    {
                        "time": "08:30 - 08:42",
                        "topic": "Xu hướng bóng phủ thuốc trong can thiệp động mạch vành",
                        "speaker": "Gs.Ts. Hoàng Anh Tiến"
                    },
                    {
                        "time": "08:43 - 08:55",
                        "topic": "Chiến lược phối hợp can thiệp tổn thương phân nhánh thân chung với stent phủ thuốc và bóng phủ thuốc",
                        "speaker": "TS. Trương Tú Trạch"
                    },
                    {
                        "time": "08:56 - 09:08",
                        "topic": "Chuẩn bị tổn thương trong can thiệp bóng phủ thuốc: Yếu tố quyết định thành công lâm sàng",
                        "speaker": "PGs.Ts. Nguyễn Văn Tân"
                    },
                    {
                        "time": "09:09 - 09:21",
                        "topic": "Bóng phủ thuốc có thay thế stent trong kỷ nguyên mới?",
                        "speaker": "PGs.Ts. Hồ Anh Bình"
                    },
                    {
                        "time": "09:22 - 09:34",
                        "topic": "Bóng phủ thuốc trong tái hẹp trong stent (ISR): Chiến lược điều trị tối ưu trong thực hành",
                        "speaker": "BsCKII. Đoàn Hữu Huy"
                    },
                    {
                        "time": "09:35 - 09:47",
                        "topic": "Vai trò của bóng phủ thuốc trong can thiệp tim mạch- thực trạng tại bệnh viện Tim Hà Nội",
                        "speaker": "BsCKII. Trần Trà Giang"
                    },
                    {
                        "time": "09:48 - 9:58",
                        "topic": "Thảo luận",
                        "speaker": ""
                    }
                ]
            },
            {
                "time": "09:59 - 11:27",
                "title": "CHIẾN LƯỢC CAN THIỆP SANG THƯƠNG PHỨC TẠP",
                "chairs": "PGs.Ts. Nguyễn Thượng Nghĩa - PGs.Ts. Nguyễn Văn Tân - TS. Đinh Đức Huy - BsCKII. Lý Ích Trung - BSCKII. Trần Văn Triệu",
                "talks": [
                    {
                        "time": "09:59 - 10:11",
                        "topic": "PCI cho tổn thương mạch vành hẹp lan tỏa",
                        "speaker": "TS. Đinh Đức Huy"
                    },
                    {
                        "time": "10:12 - 10:24",
                        "topic": "SPIRIT 48: cập nhật kết quả 1 năm trong điều trị tổn thương động mạch vành dài",
                        "speaker": "BsCKII. Trần Văn Triệu"
                    },
                    {
                        "time": "10:25 - 10:37",
                        "topic": "Kỹ thuật \"jailed balloon\" trong can thiệp tổn thương chia đôi: tip & trick",
                        "speaker": "PGs.Ts. Nguyễn Thượng Nghĩa"
                    },
                    {
                        "time": "10:38 - 10:50",
                        "topic": "Kỹ thuật can thiệp phân nhánh Crush cải tiến và ứng dụng",
                        "speaker": "BSCKI. Nguyễn Đức Hưng"
                    },
                    {
                        "time": "10:51 - 11:03",
                        "topic": "Bảo vệ nhánh bên chủ động trong can thiệp phân nhánh: ca lâm sàng",
                        "speaker": "ThS. Lê Quang Tuấn"
                    },
                    {
                        "time": "11:04 - 11:16",
                        "topic": "Thiết kế mắt cáo mở của Supraflex Cruz: Giải pháp chuyên biệt cho sang thương phân nhánh",
                        "speaker": "BsCKI. Nguyễn Hữu Nghĩa"
                    },
                    {
                        "time": "11:17 - 11:27",
                        "topic": "Thảo luận",
                        "speaker": ""
                    }
                ]
            },
            {
                "time": "11:28 - 12:13",
                "title": "LIVE CASE IN A BOX: COMPLEX PCI",
                "chairs": "Gs.Ts. Hoàng Anh Tiến - PGs.Ts. Huỳnh Văn Thưởng - TS. Nguyễn Quốc Thái - TS. Hoàng Văn - TS. Vũ Hoàng Vũ",
                "panelists": 'Ts. Trương Tú Trạch - BsCKII. Huỳnh Quốc Bình',
                "talks": [
                    {
                        "time": "11:28 - 12:13",
                        "topic": "Bệnh viện Đa khoa Trung Ương Cần Thơ",
                        "speaker": "BsCKII. Trần Văn Triệu - BsCKI. Dương Hoàng Mẫn"
                    }
                ]
            },
            {
                "time": "12:14 - 13:42",
                "title": "TIẾP CẬN TOÀN DIỆN TỔN THƯƠNG MV VÔI HÓA NẶNG",
                "chairs": "PGs.Ts. Nguyễn Thượng Nghĩa - PGs.Ts. Hồ Anh Bình - BsCKII. Lý Ích Trung - TS. Hoàng Văn - TS. Trương Tú Trạch",
                "talks": [
                    {
                        "time": "12:14 - 12:26",
                        "topic": "Các tiến bộ hiện tại trong can thiệp tổn thương mạch vành vôi hoá phức tạp",
                        "speaker": "TS.Hồ Minh Tuấn"
                    },
                    {
                        "time": "12:27 - 12:39",
                        "topic": "Tiêu chuẩn lựa chọn bệnh nhân, đánh giá tổn thương động mạch vành vôi hóa và các chiến lược điều trị bằng sóng xung siêu âm",
                        "speaker": "PGs.Ts. Hồ Anh Bình"
                    },
                    {
                        "time": "12:40 - 12:52",
                        "topic": "Kỹ thuật sử dụng bóng cắt trong thực hành: Mẹo và kinh nghiệm",
                        "speaker": "TS. Hoàng Văn"
                    },
                    {
                        "time": "12:53 - 13:05",
                        "topic": "Khoan mảng xơ vữa trong kỷ nguyên IVL: Khi nào vẫn là lựa chọn tối ưu?",
                        "speaker": "BsCKII. Lý Ích Trung"
                    },
                    {
                        "time": "13:06 - 13:18",
                        "topic": "Chiến lược phối hợp kỹ thuật: Xu hướng mới trong PCI vôi hóa nặng",
                        "speaker": "TS. Ngô Minh Hùng"
                    },
                    {
                        "time": "13:19 - 13:31",
                        "topic": "Làm chủ những ca can thiệp phức tạp: Ưu điểm của cấu trúc kết nối LDZ của stent Supraflex Star trên các tổn thương xoắn vặn",
                        "speaker": "BsCKI. Nguyễn Hữu Nghĩa"
                    },
                    {
                        "time": "13:32 - 13:42",
                        "topic": "Thảo luận",
                        "speaker": ""
                    }
                ]
            },
            {
                "time": "13:45 - 14:30",
                "title": "LIVE CASE IN A BOX: CALCIFIED LESIONS",
                "chairs": "PGs.Ts. Hồ Thượng Dũng - PGs.Ts. Nguyễn Thượng Nghĩa - PGs.Ts. Hồ Anh Bình - BsCKII. Lý Ích Trung - PGs.Ts. Đỗ Văn Chiến",
                "panelists": 'BsCKII. Đoàn Thanh Tuấn - BsCKII. Trần Trà Giang',
                "talks": [
                    {
                        "time": "13:45 - 14:30",
                        "topic": "Bệnh viện Đa khoa Sóc Trăng",
                        "speaker": "TS. Trương Tú Trạch - BsCKII. Lý Ích Trung"
                    }
                ]
            },
            {
                "time": "14:31 - 15:59",
                "title": "CẬP NHẬT VAI TRÒ HÌNH ẢNH HỌC NỘI MẠCH TRONG PCI",
                "chairs": "PGs.Ts. Huỳnh Văn Thưởng - PGs.Ts. Đỗ Văn Chiến - TS. Nguyễn Quốc Thái - BsCKII. Nguyễn Đỗ Anh - TS. Vũ Hoàng Vũ",
                "talks": [
                    {
                        "time": "14:31 - 14:43",
                        "topic": "Kỷ nguyên chẩn đoán chính xác bệnh mạch vành!",
                        "speaker": "PGs.Ts. Huỳnh Văn Thưởng"
                    },
                    {
                        "time": "14:44 - 14:56",
                        "topic": "Đặc điểm tổn thương qua IVUS, IVUS-NIRS và OCT: lựa chọn chiến lược PCI",
                        "speaker": "TS. Nguyễn Quốc Thái"
                    },
                    {
                        "time": "14:57 - 15:09",
                        "topic": "Tối ưu hóa lựa chọn stent và kỹ thuật dưới hướng dẫn hình ảnh nội mạch",
                        "speaker": "BsCKII. Nguyễn Đỗ Anh"
                    },
                    {
                        "time": "15:10 - 15:22",
                        "topic": "Vai trò của hình ảnh học nội mạch trong PCI tổn thương phức tạp: Thân chung, phân nhánh và tổn thương dài",
                        "speaker": "BsCKII. Trần Văn Triệu"
                    },
                    {
                        "time": "15:23 - 15:35",
                        "topic": "Xu hướng mới trong PCI chính xác: IVUS-NIRS, tích hợp đa phương thức và trí tuệ nhân tạo",
                        "speaker": "TS. Vũ Hoàng Vũ"
                    },
                    {
                        "time": "15:36 - 15:48",
                        "topic": "Vai trò OCT trong hướng dẫn can thiệp tổn thương vôi hóa",
                        "speaker": "TS. Nguyễn Thế Quyền"
                    },
                    {
                        "time": "15:49 - 16:01",
                        "topic": "Vai trò của IVUS trong biến chứng do can thiệp động mạch vành.",
                        "speaker": "PGs.Ts. Đỗ Văn Chiến"
                    },
                    {
                        "time": "16:02 - 16:12",
                        "topic": "Thảo luận",
                        "speaker": ""
                    }
                ]
            },
            {
                "time": "16:15 - 17:00",
                "title": "LIVE CASE IN A BOX: IMAGE-GUIDED COMPLEX PCI",
                "chairs": "BsCKII. Lý Ích Trung - TS. Nguyễn Quốc Thái - TS. Hoàng Văn - TS. Vũ Hoàng Vũ",
                "panelists": 'BsCKII. Nguyễn Đỗ Anh - PGs.Ts. Trần Viết An',
                "talks": [
                    {
                        "time": "16:15 - 17:00",
                        "topic": "Bệnh viện Đa khoa Kiên Giang",
                        "speaker": "BsCKII. Lâm Hữu Giang - ThS. Trần Minh Trung"
                    }
                ]
            }
        ],
        "hau-giang": [
            {
                "time": "08:30 - 09:53",
                "title": "ĐÁNH GIÁ NGUY CƠ SỚM ĐẾN KIỂM SOÁT NGUY CƠ TỒN DƯ",
                "chairs": "PGs.Ts. Trần Kim Trang - TS. Nguyễn Hoàng Hải - TS. Lê Cao Phương Duy",
                "talks": [
                    {
                        "time": "08:30 - 08:42",
                        "topic": "Đánh giá nguy cơ tim mạch xơ vữa người trẻ: PREVENT, Lp(a) hay PRS?",
                        "speaker": "TS. Nguyễn Hoàng Hải"
                    },
                    {
                        "time": "08:43 - 08:55",
                        "topic": "Điều trị rối loạn lipid máu ở người chưa có tiền sử tim mạch: có gì mới?",
                        "speaker": "TS. Lê Cao Phương Duy"
                    },
                    {
                        "time": "08:56 - 09:08",
                        "topic": "Cập nhật quản lý Rối loạn Lipid máu ở bệnh nhân bệnh Tim mạch do xơ vữa theo ACC/AHA 2026",
                        "speaker": "PGs.Ts. Trần Kim Sơn"
                    },
                    {
                        "time": "09:09 - 09:21",
                        "topic": "Cá thể hóa kháng kết tập tiểu cầu trên BN mạch vành kèm ĐTĐ",
                        "speaker": "BsCKII. Trịnh Thanh Tâm"
                    },
                    {
                        "time": "09:22 - 09:34",
                        "topic": "Các yếu tố lu mờ trong điều trị hội chứng vành mạn",
                        "speaker": "PGs.Ts. Trần Kim Trang"
                    },
                    {
                        "time": "09:35 - 09:47",
                        "topic": "Nguy cơ tim mạch tồn dư sau hội chứng vành cấp: Liệu Lp(a) có phải là đích điều trị tiếp theo?",
                        "speaker": "ThS.BsCKII. Lý Văn Chiêu"
                    },
                    {
                        "time": "09:48 - 09:53",
                        "topic": "Thảo luận",
                        "speaker": ""
                    }
                ]
            },
            {
                "time": "09:54 - 11:17",
                "title": "TIẾP CẬN MỚI TĂNG HUYẾT ÁP VÀ YẾU TỐ NGUY CƠ",
                "chairs": "PGs.Ts. Hoàng Văn Sỹ - PGs.Ts. Trần Kim Sơn - BsCKII. Hà Minh Đức",
                "talks": [
                    {
                        "time": "09:54 - 10:06",
                        "topic": "Đánh giá tổng thể nguy cơ tim mạch trong quản lý tăng huyết áp",
                        "speaker": "BsCKII. Lương Võ Quang Đăng"
                    },
                    {
                        "time": "10:07 - 10:19",
                        "topic": "Những tiến bộ trong quản lý Tăng huyết áp - những hiểu biết từ các hướng dẫn mới nhất của Châu Âu",
                        "speaker": "TS. Nguyễn Đức Hoàng"
                    },
                    {
                        "time": "10:20 - 10:32",
                        "topic": "Nhận diện đúng tăng huyết áp khó kiểm soát, kháng trị trên lâm sàng",
                        "speaker": "PGs.Ts. Trần Kim Sơn"
                    },
                    {
                        "time": "10:33 - 10:45",
                        "topic": "Tăng huyết áp và bệnh thận mạn: Vai trò của phát hiện sớm trong tối ưu hóa điều trị",
                        "speaker": "BsCKII. Lê Tân Tố Anh"
                    },
                    {
                        "time": "10:46 - 10:58",
                        "topic": "Điền vào khoảng trống điều trị Tăng huyết áp: ức chế tổng hợp aldosterone - mắc xích điều trị tương lai",
                        "speaker": "PGs.Ts. Hoàng Văn Sỹ"
                    },
                    {
                        "time": "10:59 - 11:11",
                        "topic": "Cập nhật điều trị THA ở người bệnh đột quỵ não: Vai trò kiểm soát huyết áp mục tiêu",
                        "speaker": "BsCKII. Hà Minh Đức"
                    },
                    {
                        "time": "11:12 - 11:17",
                        "topic": "Thảo luận",
                        "speaker": ""
                    }
                ]
            },
            {
                "time": "11:18 - 12:41",
                "title": "ĐIỀU TRỊ TOÀN DIỆN SUY TIM",
                "chairs": "Gs.Ts. Đặng Vạn Phước - TS. Lương Cao Sơn - TS. Nguyễn Tất Đạt",
                "talks": [
                    {
                        "time": "11:18 - 11:30",
                        "topic": "Quản lý tim mạch thận trên bệnh nhân đái tháo đường tuýp 2. Cập nhật theo ADA2026 hay IDF 2025",
                        "speaker": "TS. Phan Hữu Hên"
                    },
                    {
                        "time": "11:31 - 11:43",
                        "topic": "Bảo vệ Thận trên bệnh nhân Suy Tim",
                        "speaker": "TS. Lương Cao Sơn"
                    },
                    {
                        "time": "11:44 - 11:56",
                        "topic": "Đảo ngược tái cấu trúc cơ tim sau nhồi máu cơ tim: vai trò của các liệu pháp điều trị nội khoa nền tảng",
                        "speaker": "ThS.BsCKII. Trần Quang Khánh"
                    },
                    {
                        "time": "11:57 - 12:09",
                        "topic": "Cập nhật bằng chứng trong điều trị suy tim bất kể EF: vai trò SGLT2i",
                        "speaker": "PGs.Ts. Trần Viết An"
                    },
                    {
                        "time": "12:10 - 12:22",
                        "topic": "Tối ưu hóa liều chẹn Beta trên Bệnh nhân suy tim - góc nhìn từ lâm sàng",
                        "speaker": "TS. Nguyễn Tất Đạt"
                    },
                    {
                        "time": "12:23 - 12:35",
                        "topic": "Điều trị tích cực suy tim từ giai đoạn nội trú",
                        "speaker": "BsCKI. Nguyễn Đức Chính"
                    },
                    {
                        "time": "12:36 - 12:41",
                        "topic": "Thảo luận",
                        "speaker": ""
                    }
                ]
            },
            {
                "time": "12:42 - 13:30",
                "title": "Ethyl Icosapentate: mảnh ghép hoàn hảo để giải quyết khoảng trống này. Số liệu từ nghiên cứu và các khuyến cáo hiện nay",
                "chairs": "PGs.Ts. Trần Viết An - TS. Phan Hữu Hên",
                "talks": [
                    {
                        "time": "12:42 - 12:57",
                        "topic": "Nguy cơ tồn dư của rối loạn mỡ máu liên quan đến biến chứng tim mạch như thế nào: còn khoảng trống nào trong thực hành lâm sàng?",
                        "speaker": "TS. Phan Hữu Hên"
                    },
                    {
                        "time": "12:58 - 13:13",
                        "topic": "Ethyl Icosapentate: mảnh ghép hoàn hảo để giải quyết khoảng trống này. Số liệu từ nghiên cứu và các khuyến cáo hiện nay",
                        "speaker": "PGs.Ts. Trần Viết An"
                    },
                    {
                        "time": "13:14 - 13:30",
                        "topic": "Thảo luận",
                        "speaker": ""
                    }
                ]
            },
            {
                "time": "13:30 - 14:27",
                "title": "HỘI CHỨNG TIM – THẬN – CHUYỂN HÓA: TIẾP CẬN TÍCH HỢP VÀ ĐIỀU TRỊ TOÀN DIỆN",
                "chairs": "TS. Phan Hữu Hên - PGs.Ts. Đỗ Đức Minh - ThS.BsCKII. Lý Văn Chiêu",
                "talks": [
                    {
                        "time": "13:30 - 13:42",
                        "topic": "Hội chứng tim - thận chuyển hóa: tập hợp các bệnh lý bị lãng quên như thế nào?",
                        "speaker": "TS. Phan Hữu Hên"
                    },
                    {
                        "time": "13:43 - 13:55",
                        "topic": "Nhận diện sớm nguy cơ tim mạch ở bệnh nhân đái tháo đường: áp dụng vào thực hành lâm sàng như thế nào?",
                        "speaker": "PGs.Ts. Đỗ Đức Minh"
                    },
                    {
                        "time": "13:56 - 14:08",
                        "topic": "Tiếp cận điều trị ĐTĐ típ 2 bằng phối hợp thuốc: từ kiểm soát đường huyết sớm đến bảo vệ tim thận lâu dài",
                        "speaker": "BsCKII. Lê Tân Tố Anh"
                    },
                    {
                        "time": "14:09 - 14:21",
                        "topic": "Vai trò của liệu pháp nhắm đích Aldosterone trong THA khó kiểm soát- hiểu biết từ sinh lý bệnh đến bằng chứng lâm sàng",
                        "speaker": "ThS.BsCKII. Lý Văn Chiêu"
                    },
                    {
                        "time": "14:22 - 14:27",
                        "topic": "Thảo luận",
                        "speaker": ""
                    }
                ]
            },
            {
                "time": "14:28 - 16:04",
                "title": "ĐIỀU TRỊ BỆNH ĐỘNG MẠCH VÀNH TRONG KỶ NGUYÊN ĐA MỤC TIÊU",
                "chairs": "PGs.Ts. Hoàng Văn Sỹ - BsCKII. Phạm Thanh Phong - TS. Phạm Trần Linh - TS. Bùi Thế Dũng",
                "talks": [
                    {
                        "time": "14:28 - 14:40",
                        "topic": "Hội chứng vành cấp có kèm bệnh lý tim mạch - thận - chuyển hóa: Thách thức và giải pháp",
                        "speaker": "PGs.Ts. Trần Viết An"
                    },
                    {
                        "time": "14:41 - 14:53",
                        "topic": "Cập nhật mới về vai trò của SGLT2i trong điều trị suy tim sau nhồi máu cơ tim",
                        "speaker": "TS. Bùi Thế Dũng"
                    },
                    {
                        "time": "14:54 - 15:06",
                        "topic": "Quản lý KKTTC cho Bệnh nhân Hội chứng vành cấp: từ hướng dẫn đến thực hành lâm sàng",
                        "speaker": "ThS. Mai Phạm Trung Hiếu"
                    },
                    {
                        "time": "15:07 - 15:19",
                        "topic": "Hạ LDL-C sau hội chứng vành cấp: “Sớm” hay “Bền vững”?",
                        "speaker": "BsCKI. Nguyễn Đức Chính"
                    },
                    {
                        "time": "15:20 - 15:32",
                        "topic": "Điều trị Lipid máu trên bệnh nhân HCVC: lợi ích kiểm soát viêm và LDLc",
                        "speaker": "BsCKII. Trần Văn Triệu"
                    },
                    {
                        "time": "15:33 - 15:45",
                        "topic": "Vị trí của chẹn beta trong quản lý hội chứng vành mạn sau NMCT",
                        "speaker": "BsCKII. Phạm Thanh Phong"
                    },
                    {
                        "time": "15:46 - 15:58",
                        "topic": "ICD sau nhồi máu cơ tim: Thời điểm thích hợp?",
                        "speaker": "TS. Phạm Trần Linh"
                    },
                    {
                        "time": "15:59 - 16:04",
                        "topic": "Thảo luận",
                        "speaker": ""
                    }
                ]
            },
            {
                "time": "16:05 - 17:15",
                "title": "TIẾP CẬN TOÀN DIỆN YẾU TỐ NGOÀI TIM MẠCH ẢNH HƯỞNG ĐẾN KẾT CỤC TIM MẠCH",
                "chairs": "PGs.Ts. Nguyễn Văn Trí - PGs.Ts. Trần Kim Trang - PGs.Ts. Huỳnh Kim Phượng",
                "talks": [
                    {
                        "time": "16:05 - 16:17",
                        "topic": "Béo phì và biến cố tim mạch: tiếp cận và những tiến bộ điều trị hiện nay",
                        "speaker": "ThS.BsCKII. Nguyễn Minh Nguyệt"
                    },
                    {
                        "time": "16:18 - 16:30",
                        "topic": "Béo phì: nốt trầm của suy tim EF bảo tồn",
                        "speaker": "PGs.Ts. Trần Kim Trang"
                    },
                    {
                        "time": "16:31 - 16:43",
                        "topic": "Điểm mới kiểm soát đường huyết trên bệnh nhân nội viện và giải pháp insulin nền mới điều trị Đái tháo đường trên bệnh nhân tim mạch",
                        "speaker": "BsCKII. Lưu Ngọc Trân"
                    },
                    {
                        "time": "16:44 - 16:56",
                        "topic": "Cập nhật ESC về sức khỏe tâm thần và bệnh tim mạch",
                        "speaker": "PGs.Ts. Huỳnh Kim Phượng"
                    },
                    {
                        "time": "16:57 - 17:09",
                        "topic": "Điều trị tăng kali máu cấp cứu: kiểm soát từ đầu giờ - bền vững đến dài lâu",
                        "speaker": "BSCKII. Huỳnh Quốc Sĩ"
                    },
                    {
                        "time": "17:10 - 17:15",
                        "topic": "Thảo luận",
                        "speaker": ""
                    }
                ]
            }
        ],
        "soc-trang": [
            {
                "time": "08:30 - 09:46",
                "title": "VAI TRÒ CAN THIỆP SỚM ĐỂ CẢI THIỆN TIÊN LƯỢNG HỘI CHỨNG TIM - THẬN - CHUYỂN HÓA",
                "chairs": "GS.TS. Đặng Vạn Phước - PGs.Ts. Nguyễn Văn Trí - TS. Trần Viết Thắng",
                "talks": [
                    {
                        "time": "08:30 - 08:45",
                        "topic": "Hội chứng tim mạch - thận - chuyển hóa: Vai trò can thiệp sớm để cải thiện tiên lượng",
                        "speaker": "GS.TS. Đặng Vạn Phước"
                    },
                    {
                        "time": "08:46 - 08:58",
                        "topic": "Hội chứng tim mạch - thận - chuyển hóa: tiếp cận như thế nào là phù hợp nhất?",
                        "speaker": "BsCK2. Lưu Ngọc Trân"
                    },
                    {
                        "time": "08:59 - 09:14",
                        "topic": "Cập nhật chiến lược phối hợp thuốc điều trị đái tháo đường trên bệnh nhân cao tuổi",
                        "speaker": "PGs.Ts. Nguyễn Văn Trí"
                    },
                    {
                        "time": "09:15 - 09:27",
                        "topic": "Chiến lược điều trị sớm Nhằm giảm biến cố tim mạch trên bệnh nhân đái tháo đường",
                        "speaker": "TS. Trần Viết Thắng"
                    },
                    {
                        "time": "09:28 - 09:40",
                        "topic": "Gói giải pháp quản lý toàn diện bệnh tim mạch – chuyển hoá",
                        "speaker": "BsCKII. Nguyễn Duy Khương"
                    },
                    {
                        "time": "09:41 - 09:46",
                        "topic": "Thảo luận",
                        "speaker": ""
                    }
                ]
            },
            {
                "time": "09:47 - 10:57",
                "title": "CAN THIỆP CTO: KHI NÀO, BẰNG CÁCH NÀO?",
                "chairs": "Ts Bs. Vũ Hoàng Vũ - Ts Bs. Ngô Minh Hùng - TS. Trần Bá Hiếu",
                "talks": [
                    {
                        "time": "09:47 - 09:59",
                        "topic": "Cập nhật can thiệp CTO: chỉ định, tiếp cận can thiệp",
                        "speaker": "TS. Trần Bá Hiếu"
                    },
                    {
                        "time": "10:00 - 10:12",
                        "topic": "Can thiệp xuôi dòng như thế nào với hướng dẫn của IVUS",
                        "speaker": "BsCKII. Lê Văn Tuyến"
                    },
                    {
                        "time": "10:13 - 10:25",
                        "topic": "CTO case",
                        "speaker": "ThS. Phan Anh Khoa"
                    },
                    {
                        "time": "10:26 - 10:38",
                        "topic": "Can thiệp ngược dòng như thế nào: step by step",
                        "speaker": "TS. Ngô Minh Hùng"
                    },
                    {
                        "time": "10:39 - 10:51",
                        "topic": "CTO case",
                        "speaker": "ThS. Nguyễn Hữu Đức"
                    },
                    {
                        "time": "10:52 - 10:57",
                        "topic": "Thảo luận",
                        "speaker": ""
                    }
                ]
            },
            {
                "time": "10:58 - 12:34",
                "title": "THÁCH THỨC VÀ CHIẾN LƯỢC TỐI ƯU HÓA ĐIỀU TRỊ RUNG NHĨ",
                "chairs": "TS. Phạm Như Hùng - TS. Phạm Trần Linh - BsCKII. Đỗ Văn Bửu Đan",
                "talks": [
                    {
                        "time": "10:58 - 11:10",
                        "topic": "Ngất và rối loạn nhịp: khi nào cần nghi ngờ nguyên nhân tim mạch ?",
                        "speaker": "TS. Nguyễn Xuân Tuấn"
                    },
                    {
                        "time": "11:11 - 11:23",
                        "topic": "Nhịp nhanh thất trong cấp cứu: khi nào cần can thiệp khẩn cấp ?",
                        "speaker": "BsCKII. Đỗ Văn Bửu Đan"
                    },
                    {
                        "time": "11:24 - 11:36",
                        "topic": "Những sai lầm thường gặp trong sử dụng thuốc kháng đông ở bệnh nhân rung nhĩ",
                        "speaker": "ThS. Trần Lê Uyên Phương"
                    },
                    {
                        "time": "11:37 - 11:49",
                        "topic": "Kết cục an toàn của kháng đông đường uống trên bệnh nhân rung nhĩ: Cập nhật dữ liệu mới",
                        "speaker": "BsCKII. Đoàn Công Du"
                    },
                    {
                        "time": "11:50 - 12:02",
                        "topic": "Kiểm soát tần số hay kiểm soát nhịp trong rung nhĩ: góc nhìn từ trung tâm mới triển khai Ablation",
                        "speaker": "BsCKII. Nguyễn Hữu Thái"
                    },
                    {
                        "time": "12:03 - 12:15",
                        "topic": "Triệt đốt rung nhĩ cho ai ? Khi nào ?",
                        "speaker": "TS. Phạm Trần Linh"
                    },
                    {
                        "time": "12:16 - 12:28",
                        "topic": "Rung nhĩ trong suy tim: chiến lược điều trị hiện nay",
                        "speaker": "TS. Phạm Như Hùng"
                    },
                    {
                        "time": "12:29 - 12:34",
                        "topic": "Thảo luận",
                        "speaker": ""
                    }
                ]
            },
            {
                "time": "12:35 - 14:11",
                "title": "CAN THIỆP BỆNH TIM CẤU TRÚC: XU HƯỚNG CẬP NHẬT",
                "chairs": "TS. Đỗ Nguyên Tín - TS. Nguyễn Minh Hùng - BsCKII. Đỗ Thị Cẩm Giang",
                "talks": [
                    {
                        "time": "12:35 - 12:47",
                        "topic": "Những kỹ thuật mới trong can thiệp tim bẩm sinh và bệnh tim cấu trúc",
                        "speaker": "TS. Đỗ Nguyên Tín"
                    },
                    {
                        "time": "12:48 - 13:00",
                        "topic": "Can thiệp tim thai: Bài học từ các case đầu tiên tại Việt Nam",
                        "speaker": "BsCKII. Đỗ Thị Cẩm Giang"
                    },
                    {
                        "time": "13:01 - 13:13",
                        "topic": "Đóng tiểu nhĩ trái (LAAO) 2026: chiến lược cá thể hóa trong phòng ngừa đột quỵ ở bệnh nhân rung nhĩ",
                        "speaker": "ThS Đào Anh Quốc"
                    },
                    {
                        "time": "13:14 - 13:26",
                        "topic": "Đóng lỗ bầu dục qua catheter trong dự phòng đột quỵ não: Bằng chứng hiện tại và khuyến cáo",
                        "speaker": "TS. Nguyễn Minh Hùng"
                    },
                    {
                        "time": "13:27 - 13:39",
                        "topic": "Thay van động mạch phổi: Cập nhật chỉ định, kỹ thuật và kết cục lâm sàng",
                        "speaker": "ThS Nguyễn Quốc Hùng"
                    },
                    {
                        "time": "13:40 - 13:52",
                        "topic": "Những thách thức trong can thiệp bít thông liên nhĩ ở người lớn",
                        "speaker": "ThS. Châu Thuận Thành"
                    },
                    {
                        "time": "13:53 - 14:05",
                        "topic": "Can thiệp bít thông liên thất bằng dụng cụ tại bệnh viện nhi đồng Cần Thơ",
                        "speaker": "BsCKI. Lê Hoàng Khoa"
                    },
                    {
                        "time": "14:06 - 14:11",
                        "topic": "Thảo luận",
                        "speaker": ""
                    }
                ]
            },
            {
                "time": "14:12 - 15:22",
                "title": "CAN THIỆP VAN VÀ ĐỘNG MẠCH CHỦ: CẬP NHẬT VÀ KINH NGHIỆM THỰC TIỄN",
                "chairs": "Gs.Ts. Nguyễn Hoàng Định - TS. Phạm Minh Ánh",
                "talks": [
                    {
                        "time": "14:12 - 14:24",
                        "topic": "Cập nhật điều trị bệnh lý van động mạch chủ theo ESC 2025 và TCT 2025",
                        "speaker": "BsCKI. Nguyễn Hoàng Tài My"
                    },
                    {
                        "time": "14:25 - 14:37",
                        "topic": "Vai trò của MSCT trong thay van động mạch chủ qua da.",
                        "speaker": "ThS.BSNT. Trần Đình Tuyên"
                    },
                    {
                        "time": "14:38 - 14:50",
                        "topic": "Làm thế nào xây dựng một chương trình TAVI thành công và bền vững: kinh nghiệm từ Bệnh viện ĐHYD TPHCM",
                        "speaker": "Gs.Ts. Nguyễn Hoàng Định"
                    },
                    {
                        "time": "14:51 - 15:03",
                        "topic": "Những biến chứng có thể trong can thiệp đặt Stent Graft động mạch chủ bụng",
                        "speaker": "TS. Phạm Minh Ánh"
                    },
                    {
                        "time": "15:04 - 15:16",
                        "topic": "Tổng kết kết quả điều trị phình động mạch chủ tại Bệnh viện Đa khoa Quốc tế SIS Cần Thơ giai đoạn 2019–2026",
                        "speaker": "Bs. Nguyễn Minh Đức"
                    },
                    {
                        "time": "15:17 - 15:22",
                        "topic": "Thảo luận",
                        "speaker": ""
                    }
                ]
            },
            {
                "time": "15:23 - 16:33",
                "title": "CAN THIỆP MẠCH MÁU NGOẠI BIÊN: ĐỊNH HƯỚNG TƯƠNG LAI",
                "chairs": "PGs.Ts. Hồ Thượng Dũng - TS. Hồ Minh Tuấn - BsCKII. Nguyễn Lưu Giang",
                "talks": [
                    {
                        "time": "15:23 - 15:35",
                        "topic": "Vai trò hiện nay của triệt đốt thần kinh giao cảm trong quản lý THA",
                        "speaker": "PGs.Ts. Hồ Thượng Dũng"
                    },
                    {
                        "time": "15:36 - 15:48",
                        "topic": "Đặt Stent Hẹp nặng động mạch cảnh không triệu chứng: Kết quả trông đợi từ nghiên cứu CREST-2",
                        "speaker": "TS. Hồ Minh Tuấn"
                    },
                    {
                        "time": "15:49 - 16:01",
                        "topic": "Cập nhật chẩn đoán và điều trị bệnh lý hẹp động mạch cảnh đoạn ngoài sọ",
                        "speaker": "ThS.BsCKII Nguyễn Văn Thảo"
                    },
                    {
                        "time": "16:02 - 16:14",
                        "topic": "Can thiệp đặt stent gốc động mạch cảnh: kinh nghiệm tại BV Đa Khoa Quốc Tế SIS Cần Thơ",
                        "speaker": "BsCKII. Nguyễn Lưu Giang"
                    },
                    {
                        "time": "16:15 - 16:27",
                        "topic": "Kết quả đặt stent động mạch cảnh trong nhồi máu não cấp",
                        "speaker": "ThS. Lê Minh Thắng"
                    },
                    {
                        "time": "16:28 - 16:33",
                        "topic": "Thảo luận",
                        "speaker": ""
                    }
                ]
            }
        ],
        "goc-giao-luu-mica": [
            {
                "time": "09:00 - 10:30",
                "title": "TỐI ƯU HÓA ĐIỀU TRỊ: GÓC NHÌN TỪ QUẢN LÝ BỆNH VIỆN ĐẾN HỆ THỐNG Y TẾ",
                "chairs": "",
                "talks": [
                    {
                        "time": "",
                        "topic": "Bệnh viện Đa khoa Trung Ương Cần Thơ",
                        "speaker": "BsCKII. Phạm Thnah Phong"
                    },
                    {
                        "time": "",
                        "topic": "Bệnh viện Đa khoa Long An",
                        "speaker": "Ts. Nguyễn Văn Hoàng"
                    },
                    {
                        "time": "",
                        "topic": "Bệnh viện Tim mạch Thành phố Cần Thơ",
                        "speaker": "BsCKII. Võ Hồng Sở"
                    },
                    {
                        "time": "",
                        "topic": "Bệnh viện Trường Đại học Y Dược Cần Thơ",
                        "speaker": "PGs.Ts. Võ Phạm Minh Thư"
                    },
                    {
                        "time": "",
                        "topic": "Bảo hiểm Xã Hội TP Cần Thơ",
                        "speaker": "Bà Nguyễn Thị Thanh Xuân"
                    }
                ]
            },
            {
                "time": "10:30 - 11:32",
                "title": "TỪ KHUYẾN CÁO ĐẾN CA LÂM SÀNG",
                "chairs": "TS. Trần Hữu Thế - BsCKII. Nguyễn Duy Khương - BSCKII. Lê Mộng Toàn",
                "talks": [
                    {
                        "time": "10:30 - 10:42",
                        "topic": "Cas lâm sàng: Thuyên tắc phổi biến chứng sốc tắc nghẽn điều trị bằng thuốc Tiêu sợi huyết",
                        "speaker": "BsCKI. Nguyễn Thế Vinh"
                    },
                    {
                        "time": "10:43 - 10:55",
                        "topic": "Điều trị hybrid trong thiếu máu bán cấp chi dưới: thách thức và hiệu quả",
                        "speaker": "ThS. Đàm Hải Sơn"
                    },
                    {
                        "time": "10:56 - 11:08",
                        "topic": "Cập nhật quản lý tăng huyết áp áo choàng trắng, tăng huyết áp ẩn dấu",
                        "speaker": "ThS. Ngô Hoàng Toàn"
                    },
                    {
                        "time": "11:09 - 11:22",
                        "topic": "Trường hợp lâm sàng: nhồi máu cơ tim cấp ở người trẻ",
                        "speaker": "TS. Trần Hữu Thế"
                    },
                    {
                        "time": "11:22 - 11:32",
                        "topic": "Thảo luận",
                        "speaker": ""
                    }
                ]
            },
            {
                "time": "11:33 - 12:48",
                "title": "TỪ CHUẨN BỊ ĐẾN LÀM CHỦ CAN THIỆP",
                "chairs": "BsCKII. Trịnh Thanh Tâm -BsCKI. Nguyễn Đức Chỉnh - ThS. Phạm Huỳnh Minh Trí",
                "talks": [
                    {
                        "time": "11:33 - 11:45",
                        "topic": "Mọi thứ đã chuẩn bị xong",
                        "speaker": "Ths. Nguyễn Xuân Duy"
                    },
                    {
                        "time": "11:46 - 11:58",
                        "topic": "Khi Mọi Thứ Tưởng Đã Xong… Nhưng Thực Ra Chưa Bắt Đầu",
                        "speaker": "BSCKI. Bùi Quốc Bảo Thành"
                    },
                    {
                        "time": "11:59 - 12:11",
                        "topic": "Cas can thiệp động mạch vành của người mới bắt đầu",
                        "speaker": "BS. Nguyễn Quốc Việt"
                    },
                    {
                        "time": "12:12 - 12:24",
                        "topic": "Kỹ thuật Double Kissing Culotte trong điều trị tổn thương phân nhánh động mạch vành phức tạp non-LM",
                        "speaker": "ThS.BSNT. Trần Đức Minh"
                    },
                    {
                        "time": "12:25 - 12:37",
                        "topic": "Khi biến chứng không phải là điểm kết thúc",
                        "speaker": "BsCKI. Nguyễn Thế Tiến"
                    },
                    {
                        "time": "12:38 - 12:48",
                        "topic": "Thảo luận",
                        "speaker": ""
                    }
                ]
            },
            {
                "time": "13:30 - 14:40",
                "title": "NGHIÊN CỨU KHOA HỌC",
                "chairs": "BsCKII. Lê Tân Tố Anh - ThS.BsCKII. Nguyễn Minh Nguyệt",
                "talks": [
                    {
                        "time": "13:30 - 13:45",
                        "topic": "Mối liên quan giữa đa hình gen microRNA-146a, các yếu tố nguy cơ tim mạch và biến cố tim mạch chính ở bệnh nhân nhồi máu cơ tim cấp.",
                        "speaker": "Ths. Ngô Hoàng Toàn"
                    },
                    {
                        "time": "13:45 - 14:00",
                        "topic": "Quản lý bệnh động mạch vành tại TPHCM: Vai trò của việc tự chăm sóc bản thân và kiến thức về bệnh trong việc giảm hành vi nguy cơ sức khỏe",
                        "speaker": "Ts.ĐD. Nguyễn Thị Phương Uyên"
                    },
                    {
                        "time": "14:00 - 14:15",
                        "topic": "Đánh giá hiệu quả thông tim can thiệp tim bẩm sinh ở trẻ em tại Bệnh viện Nhi Đồng thành phố Cần Thơ",
                        "speaker": "ThS. Lê Hoàng Khoa"
                    },
                    {
                        "time": "14:15 - 14:30",
                        "topic": "Mô tả sự khác biệt tỷ số bạch cầu đa nhân trung tính bạch cầu lympho ở bệnh nhân HCVM và HCVC tại Bệnh viện Hùng Vương Gia Lai",
                        "speaker": "Ths.BSNT. Võ Văn Thọ"
                    },
                    {
                        "time": "14:30 - 14:40",
                        "topic": "Thảo luận",
                        "speaker": ""
                    }
                ]
            }
        ]
    };

    // --- DỮ LIỆU BÁO CÁO VIÊN TRÍCH XUẤT TỪ FILE WORD ---
    const speakersData = [
        {
            "name": "GS.TS. Nguyễn Hoàng Định",
            "desc": "Phó Giám đốc Bệnh viện Đại học Y Dược Thành phố Hồ Chí Minh"
        },
        {
            "name": "GS.TS. Đặng Vạn Phước",
            "desc": "Phó Chủ tịch Hội Tim mạch học Việt Nam<br>Nguyên Hiệu trưởng Đại học Y Dược TP. Hồ Chí Minh"
        },
        {
            "name": "GS.TS. Hoàng Anh Tiến",
            "desc": "Phó Chủ tịch Phân hội Xơ vữa động mạch Việt Nam<br>Giám đốc Trung tâm Tim mạch, Bệnh viện Trường Đại học Y Dược Huế"
        },
        {
            "name": "PGS.TS. Trần Viết An",
            "desc": "Chủ tịch Chi hội Tim mạch can thiệp Mekong<br>Phó Hiệu trưởng Trường Đại học Y Dược Cần Thơ"
        },
        {
            "name": "PGS.TS. Hồ Anh Bình",
            "desc": "Giám đốc Trung tâm Tim mạch – Bệnh viện Trung Ương Huế<br>Phó Giám đốc Bệnh viện Quốc tế Trung ương Huế<br>Phó chủ tịch Phân hội Tim mạch can thiệp Việt Nam"
        },
        {
            "name": "PGS.TS. Đỗ Văn Chiến",
            "desc": "Phó Chủ nhiệm Khoa Hồi sức Tim mạch, Bệnh viện Trung Ương Quân Đội 108."
        },
        {
            "name": "PGS.TS. Hồ Thượng Dũng",
            "desc": "Nguyên Phó giám đốc tại Bệnh viện Thống Nhất<br>Nguyên Chủ tịch Phân hội Tim mạch can thiệp Việt Nam"
        },
        {
            "name": "PGS.TS. Đỗ Đức Minh",
            "desc": "Phó giám đốc Trung tâm Y sinh học phân tử, Đại học Y Dược TPHCM"
        },
        {
            "name": "PGS.TS. Nguyễn Thượng Nghĩa",
            "desc": "Nguyên Phó Giám đốc, Trung tâm tim mạch Bệnh viện Chợ Rẫy"
        },
        {
            "name": "PGS.TS. Huỳnh Kim Phượng",
            "desc": "Trường Đại học Y Khoa Phạm Ngọc Thạch"
        },
        {
            "name": "PGS.TS. Trần Kim Sơn",
            "desc": "Chủ tịch Liên chi hội Tăng huyết áp Đồng bằng sông Cửu Long<br>Trưởng Khoa Khám bệnh, Bệnh viện Trường Đại học Y Dược Cần Thơ"
        },
        {
            "name": "PGS.TS. Hoàng Văn Sỹ",
            "desc": "Trưởng Bộ môn Nội Tổng quát, Trường Y, Đại học Y Dược TP. Hồ Chí Minh<br>Trưởng Khoa Nội Tim mạch, Bệnh viện Chợ Rẫy"
        },
        {
            "name": "PGS.TS. Nguyễn Văn Tân",
            "desc": "Trưởng Bộ môn Lão khoa, ĐHYD TP. HCM<br>Trưởng Khoa Tim mạch Cấp cứu và Can thiệp, Bệnh viện Thống Nhất"
        },
        {
            "name": "PGS.TS. Huỳnh Văn Thưởng",
            "desc": "Nguyên Phó Giám đốc, Bệnh viện Đa khoa Tỉnh Khánh Hòa"
        },
        {
            "name": "PGs.TS. Võ Phạm Minh Thư",
            "desc": "Phó giám đốc Bệnh viện Trường ĐHYD Cần Thơ"
        },
        {
            "name": "PGS.TS. Trần Kim Trang",
            "desc": "Đại học Y dược TP. Hồ Chí Minh"
        },
        {
            "name": "PGS.TS. Nguyễn Văn Trí",
            "desc": "Chủ tịch Liên chi Hội Lão khoa TP. Hồ Chí Minh"
        },
        {
            "name": "TS.BS. Phạm Minh Ánh",
            "desc": "Trưởng đơn vị Đơn Vị Phẫu Thuật Can Thiệp Mạch Máu Bệnh viện Vạn Hạnh (TPHCM)"
        },
        {
            "name": "TS.BS. Bùi Thế Dũng",
            "desc": "Trưởng khoa Nội Tim mạch, Bệnh viện Đại học Y Dược TP. Hồ Chí Minh"
        },
        {
            "name": "TS.BS. Lê Cao Phương Duy",
            "desc": "Phó giám đốc Bệnh viện Nguyễn Tri Phương"
        },
        {
            "name": "TS.BS. Nguyễn Tất Đạt",
            "desc": "Khoa Nội Tim mạch, Bệnh viện Chợ Rẫy"
        },
        {
            "name": "TS.BS. Nguyễn Hoàng Hải",
            "desc": "Giám đốc Bệnh viện Nhân dân Gia Định"
        },
        {
            "name": "TS.BS. Phan Hữu Hên",
            "desc": "Trưởng khoa Nội tiết, Bệnh viện Chợ Rẫy"
        },
        {
            "name": "TS.BS. Trần Bá Hiếu",
            "desc": "Trưởng khoa Hồi sức cấp cứu tim mạch, Bệnh viện Bạch Mai"
        },
        {
            "name": "TS.BS. Nguyễn Đức Hoàng",
            "desc": "Phó giám đốc Bệnh viện Trung Ương Huế Cơ sở 2"
        },
        {
            "name": "TS.BS. Nguyễn Văn Hoàng",
            "desc": "Giám đốc Bệnh viện Đa khoa Long An"
        },
        {
            "name": "TS.BS. Đinh Đức Huy",
            "desc": "Giám đốc Nội Tim mạch, Bệnh viện Tim Tâm Đức TP. HCM"
        },
        {
            "name": "TS.BS. Ngô Minh Hùng",
            "desc": "Phó Trưởng Khoa Tim mạch Can thiệp, Bệnh viện Chợ Rẫy<br>Phó Chủ tịch Hội đồng cố vấn Y khoa, Bệnh viện Đại học Nam Cần Thơ"
        },
        {
            "name": "TS.BS. Nguyễn Minh Hùng",
            "desc": ""
        },
        {
            "name": "TS.BS. Phạm Như Hùng",
            "desc": "Giám đốc Trung tâm tim mạch, Phó Giám đốc Bệnh viện Tim Hà Nội"
        },
        {
            "name": "TS.BS. Phạm Trần Linh",
            "desc": "Phó Chủ tịch Phân hội Nhịp tim Việt Nam<br>Trưởng khoa Rối loạn nhịp và Điện sinh lý, Viện Tim mạch, Bệnh viện Bạch Mai"
        },
        {
            "name": "TS. Nguyễn Thế Quyền",
            "desc": "Bộ môn Lão khoa, Trường Đại học Y khoa Phạm Ngọc Thạch"
        },
        {
            "name": "TS.BS. Lương Cao Sơn",
            "desc": "Trưởng Đơn vị Nhịp tim học, Bệnh viện Đại học Y Dược TP. HCM<br>Phó Trưởng khoa Nội Tim mạch, Bệnh viện Đại học Y Dược TP. Hồ Chí Minh"
        },
        {
            "name": "TS.BS. Nguyễn Quốc Thái",
            "desc": "Phó Viện trưởng Viện Tim mạch Việt Nam, Bệnh viện Bạch Mai"
        },
        {
            "name": "TS.BS. Trần Viết Thắng",
            "desc": "Khoa Tim mạch Can thiệp, Bệnh viện Nhân dân Gia Định"
        },
        {
            "name": "TS.BS. Trần Hữu Thế",
            "desc": "Trưởng Khoa Tim mạch, Bệnh viện Đa khoa Tiền Giang"
        },
        {
            "name": "TS.BS. Nguyễn Ngọc Phương Thư",
            "desc": "Trường Đại học Y khoa Phạm Ngọc Thạch"
        },
        {
            "name": "TS.BS. Đỗ Nguyên Tín",
            "desc": "Chủ tịch Liên chi hội Tim mạch Nhi và Tim bẩm sinh TP. HCM<br>Trưởng Khoa Tim mạch Can thiệp, Bệnh viện Nhi đồng 1 TP. HCM"
        },
        {
            "name": "TS.BS. Trương Tú Trạch",
            "desc": "Phó Giám đốc, Bệnh viện Đa khoa Tỉnh Sóc Trăng"
        },
        {
            "name": "TS.BS. Hồ Minh Tuấn",
            "desc": "Trưởng Khoa Tim mạch và Tim mạch can thiệp, Bệnh viện FV"
        },
        {
            "name": "TS.BS. Nguyễn Xuân Tuấn",
            "desc": "Trưởng khoa Tim mạch can thiệp, Bệnh viện Tim Hà Nội"
        },
        {
            "name": "TS. ĐD. Nguyễn Thị Phương Uyên",
            "desc": "Phó Trưởng khoa Điều dưỡng - Hộ sinh, Trường Đại học Quốc tế Hồng Bàng"
        },
        {
            "name": "TS.BS. Hoàng Văn",
            "desc": "Phó Giám đốc Bệnh viện Tim Hà Nội"
        },
        {
            "name": "TS.BS. Vũ Hoàng Vũ",
            "desc": "Trưởng Khoa Tim mạch Can thiệp, Bệnh viện Đại học Y Dược TP. HCM"
        },
        {
            "name": "BSCKII. Nguyễn Đỗ Anh",
            "desc": "Trưởng Khoa Tim mạch Can thiệp, Bệnh viện Nhân dân Gia Định"
        },
        {
            "name": "BSCKII. Lê Tân Tố Anh",
            "desc": "Phó Chủ tịch Liên chi Hội Tăng huyết áp ĐBSCL<br>Phó Giám đốc Bệnh viện Tim mạch Thành phố Cần Thơ"
        },
        {
            "name": "BSCKII. Huỳnh Quốc Bình",
            "desc": "Trưởng Khoa Tim mạch Can thiệp, Bệnh viện Tim mạch An Giang"
        },
        {
            "name": "BSCKII.ThS. Lý Văn Chiêu",
            "desc": "Giám đốc Trung tâm Tim mạch, Bệnh viện Chợ Rẫy"
        },
        {
            "name": "BSCKII. Đoàn Công Du",
            "desc": "Trưởng Khoa Nội Tim mạch – Lão học, Bệnh viện Đa khoa An Giang<br>Trưởng khoa Tim mạch Lão học, Bệnh viện Đa khoa An Giang"
        },
        {
            "name": "BSCKII. Đỗ Văn Bửu Đan",
            "desc": "Tổng Giám đốc, Trưởng khoa Điện sinh lý tim, Bệnh viện Tim Tâm Đức"
        },
        {
            "name": "BSCKII. Hà Minh Đức",
            "desc": "Trưởng khoa nội Thần Kinh - Đột Quỵ, BVĐK Châu Đốc, An Giang"
        },
        {
            "name": "BSCKII. Đỗ Thị Cẩm Giang",
            "desc": "Khoa Tim mạch, Bệnh viện Nhi Đồng 1 TP. Hồ Chí Minh"
        },
        {
            "name": "BSCKII. Lâm Hữu Giang",
            "desc": "Phó Trưởng Khoa Nội tim mạch, Bệnh viện Đa khoa Kiên Giang"
        },
        {
            "name": "BSCKII. Nguyễn Lưu Giang",
            "desc": "Trưởng đơn vị DSA, Bệnh viện Đa khoa Quốc Tế SIS Cần Thơ"
        },
        {
            "name": "BSCKII. Trần Trà Giang",
            "desc": "Khoa tim mạch can thiệp, Bệnh viện Tim Hà Nội"
        },
        {
            "name": "BSCKII. Đoàn Hữu Huy",
            "desc": "Bệnh viện Nhân Dân Gia Định"
        },
        {
            "name": "BSCKII.ThS. Trần Quang Khánh",
            "desc": "Khoa Tim mạch Can thiệp, Bệnh viện Chợ Rẫy"
        },
        {
            "name": "BSCKII. Nguyễn Duy Khương",
            "desc": "Phó khoa Tim mạch can thiệp, Bệnh viện Trường ĐHYD Cần Thơ"
        },
        {
            "name": "BSCKII.ThS. Nguyễn Minh Nguyệt",
            "desc": "Bệnh viện Đa khoa Quốc tế S.I.S Cần Thơ"
        },
        {
            "name": "BSCKII. Phạm Thanh Phong",
            "desc": "Phó giám đốc Bệnh viện Đa khoa Trung Ương Cần Thơ"
        },
        {
            "name": "BSCKII. Lương Võ Quang Đăng",
            "desc": "Bệnh viện Đa khoa Quốc tế Vinmec Phú Quốc"
        },
        {
            "name": "BSCKII. Huỳnh Quốc Sĩ",
            "desc": "Trưởng khoa Cấp cứu, Bệnh viện Đa khoa Quốc tế SIS Cần Thơ"
        },
        {
            "name": "BsCKII. Võ Hồng Sở",
            "desc": "Giám đốc Bệnh viện Tim mạch TP Cần Thơ"
        },
        {
            "name": "BSCKII. Trịnh Thanh Tâm",
            "desc": "Trưởng khoa Hồi sức tích cực - Chống độc, Bệnh viện Tim mạch Cần Thơ"
        },
        {
            "name": "BSCKII. Nguyễn Hữu Thái",
            "desc": "Trưởng khoa Nội tim Mạch - Can thiệp nội mạch, Bệnh viện Hoàn Mỹ Cửu Long"
        },
        {
            "name": "BSCKII.ThS. Nguyễn Văn Thảo",
            "desc": "Phó khoa Thần kinh, Bệnh viện Đa khoa Kiên Giang"
        },
        {
            "name": "BSCKII. Lê Mộng Toàn",
            "desc": "Trưởng khoa Tim mạch can thiệp, Bệnh viện Đa khoa Bến Tre"
        },
        {
            "name": "BSCKII. Lưu Ngọc Trân",
            "desc": "Trường khoa Nội tiết, Bệnh viện Đa khoa TP Cần Thơ"
        },
        {
            "name": "BSCKII. Trần Văn Triệu",
            "desc": "Trưởng Khoa Tim mạch Can thiệp, Bệnh viện Trung Ương Cần Thơ"
        },
        {
            "name": "BSCKII. Lý Ích Trung",
            "desc": "Trưởng Khoa Tim mạch Can thiệp, Trung tâm Tim mạch, Bệnh viện Chợ Rẫy"
        },
        {
            "name": "BSCKII. Đoàn Thanh Tuấn",
            "desc": "Phó khoa Tim mạch, Bệnh việ Đa khoa TP Cần Thơ"
        },
        {
            "name": "BSCKII. Lê Văn Tuyến",
            "desc": "Khoa Tim mạch, Bệnh viện Quốc tế Thành Đô"
        },
        {
            "name": "Bà Nguyễn Thị Thanh Xuân",
            "desc": "Giám đốc Bảo hiểm xã hội TP. Cần Thơ"
        },
        {
            "name": "ThS. Nguyễn Xuân Duy",
            "desc": "Khoa Tim mạch, Bệnh viện Đa khoa Tâm Anh Hà Nội"
        },
        {
            "name": "ThS. Nguyễn Hữu Đức",
            "desc": "Trưởng Khoa Nội Tim mạch, Bệnh viện Đa khoa Quảng Trị"
        },
        {
            "name": "ThS.BSCKI. Mai Phạm Trung Hiếu",
            "desc": "Phó Giám đốc Bệnh Viện Tim mạch An Giang"
        },
        {
            "name": "ThS. Nguyễn Quốc Hùng",
            "desc": "Phó khoa phụ trách Khoa Nội nhi, Bệnh viện Tim Hà Nội"
        },
        {
            "name": "ThS. Phan Anh Khoa",
            "desc": "Trung tâm Tim mạch, Bệnh viện Trung Ương Huế"
        },
        {
            "name": "ThS.BSNT. Trần Đức Minh",
            "desc": "Khoa Tim mạch, Bệnh viện Đa khoa Tâm Anh Hà Nội"
        },
        {
            "name": "ThS.BS. Đào Anh Quốc",
            "desc": "Khoa Phẫu thuật Tim, Bệnh viện Đại học Y Dược TP. HCM"
        },
        {
            "name": "ThS.BS. Trần Lê Uyên Phương",
            "desc": "Phó khoa Rối loạn nhịp, Trung tâm Tim mạch, Bệnh viện Chợ Rẫy"
        },
        {
            "name": "ThS.BSNT. Đàm Hải Sơn",
            "desc": "Khoa phẫu thuật tim mạch và lồng ngực, Trung tâm Tim mạch, Bệnh viện E"
        },
        {
            "name": "ThS.BS. Châu Thuận Thành",
            "desc": "Khoa Nội Tim mạch, Bệnh viện Đa khoa Kiên Giang"
        },
        {
            "name": "ThS.BS. Lê Minh Thắng",
            "desc": "Đơn vị DSA, Bệnh viện Đa khoa Quốc Tế SIS Cần Thơ"
        },
        {
            "name": "Ths.BSNT. Võ Văn Thọ",
            "desc": "Khoa Nội Tổng hợp - Tim mạch Bệnh viện Hùng Vương Gia Lai"
        },
        {
            "name": "ThS. Ngô Hoàng Toàn",
            "desc": "Bộ môn Nội, Trường Đại học Y Dược Cần Thơ"
        },
        {
            "name": "ThS. Phạm Huỳnh Minh Trí",
            "desc": "Trưởng khoa Tim mạch can thiệp, Bệnh viện Đa khoa An Giang"
        },
        {
            "name": "ThS. Lê Quang Tuấn",
            "desc": "Phó trưởng khoa Tim mạch, Bệnh viện Cà Mau"
        },
        {
            "name": "ThS.BSNT. Trần Đình Tuyên",
            "desc": "Viện Tim mạch, Bệnh Viện 19-8"
        },
        {
            "name": "BSCKI. Nguyễn Đức Chính",
            "desc": "Trưởng Khoa Nội Tổng hợp, Bệnh viện Đa khoa Quốc tế S.I.S Cần Thơ"
        },
        {
            "name": "BSCKI. Nguyễn Đức Hưng",
            "desc": "Phó khoa Tim mạch phụ trách Can thiệp, Bệnh viện Đa khoa Tâm Anh Hà Nội"
        },
        {
            "name": "BSCKI. Lê Hoàng Khoa",
            "desc": "Bác sĩ Khoa Nội tim mạch, Bệnh viện Nhi Đồng Cần Thơ"
        },
        {
            "name": "BSCKI. Nguyễn Hoàng Tài My",
            "desc": "Bệnh viện Chợ Rẫy"
        },
        {
            "name": "BSCKI. Nguyễn Hữu Nghĩa",
            "desc": "Trưởng khoa Tim mạch can thiệp – Bệnh viện Đa khoa Châu Đốc An Giang"
        },
        {
            "name": "BSCKI. Nguyễn Hữu Nghĩa",
            "desc": "Phó trưởng khoa Tim mạch can thiệp – Bệnh viện Tim mạch An Giang"
        },
        {
            "name": "BSCKI. Nguyễn Thế Tiến",
            "desc": "Khoa Tim mạch Can thiệp, Bệnh viện Nhân dân Gia Định"
        },
        {
            "name": "BSCKI. Bùi Quốc Bảo Thành",
            "desc": "Bệnh viện 199, Bộ Công An, TP Đà Nẵng"
        },
        {
            "name": "BSCKI. Nguyễn Thế Vinh",
            "desc": "Đơn vị Can thiệp nội mạch, khoa Nội Tim Mạch, Bệnh viện Đa khoa Long An"
        },
        {
            "name": "Bs. Nguyễn Minh Đức",
            "desc": "Đơn vị DSA, Bệnh viện Đa khoa Quốc Tế SIS Cần Thơ"
        },
        {
            "name": "BS. Nguyễn Quốc Việt",
            "desc": "Đơn vị can thiệp nội mạch, Bệnh viện Tâm Trí - Cao Lãnh"
        }
    ];

    // Hàm tô màu chữ (highlight) khi tìm kiếm
    function highlightText(text, query) {
        if (!query || query.trim() === '') return text;
        // Thoát các ký tự đặc biệt trong Regex để tránh lỗi
        const escapedQuery = query.trim().replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        const regex = new RegExp(`(${escapedQuery})`, 'gi');
        return text.replace(regex, '<mark style="background-color: #fef08a; padding: 0 2px; border-radius: 2px; color: #1f2937;">$1</mark>');
    }

    // --- RENDER DANH SÁCH BÁO CÁO VIÊN ---
    function updateBaoCaoVienView() {
        const listContainer = document.getElementById('mica-speakers-list');
        if (!listContainer) return;

        let displaySpeakers = speakersData;

        // Lọc danh sách theo tìm kiếm
        if (searchQuery.trim() !== '') {
            const query = searchQuery.trim().toLowerCase();
            displaySpeakers = speakersData.filter(speaker =>
                speaker.name.toLowerCase().includes(query) ||
                speaker.desc.toLowerCase().includes(query)
            );
        }

        if (displaySpeakers.length === 0) {
            listContainer.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #6b7280; background: white; border-radius: 8px; border: 1px dashed #cbd5e1; grid-column: 1 / -1;">
                    <svg style="width: 48px; height: 48px; margin: 0 auto 16px auto; color: #9ca3af;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <p style="margin: 0; font-size: 16px;">Không tìm thấy báo cáo viên nào phù hợp.</p>
                </div>
            `;
            return;
        }

        // Render ra dạng lưới (Grid)
        listContainer.innerHTML = displaySpeakers.map(speaker => `
            <div style="background: white; border-radius: 12px; border: 1px solid #e5e7eb; padding: 20px; display: flex; gap: 16px; align-items: flex-start; box-shadow: 0 2px 4px rgba(0,0,0,0.02); transition: transform 0.2s, box-shadow 0.2s;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 10px 15px -3px rgba(0,0,0,0.1)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 4px rgba(0,0,0,0.02)';">
                <div style="flex-shrink: 0; width: 48px; height: 48px; border-radius: 50%; background-color: #eff6ff; color: #3b82f6; display: flex; align-items: center; justify-content: center; border: 1px solid #bfdbfe;">
                    <svg style="width: 24px; height: 24px;" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                </div>
                <div style="flex: 1;">
                    <div style="font-weight: 600; font-size: 15px; color: #1e3a8a; margin-bottom: 6px; line-height: 1.3;">
                        ${highlightText(speaker.name, searchQuery)}
                    </div>
                    <div style="font-size: 13px; color: #4b5563; line-height: 1.5;">
                        ${highlightText(speaker.desc, searchQuery)}
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Hàm chỉ render lại các Tabs và Nội dung danh sách (để không làm mất focus thanh tìm kiếm)
    function updateChiTietView() {
        const tabsContainer = document.getElementById('mica-hall-tabs');
        const listContainer = document.getElementById('mica-sessions-list');

        if (!tabsContainer || !listContainer) return;

        // 1. Cập nhật giao diện Tabs
        tabsContainer.innerHTML = `
            <div style="display: flex; gap: 10px; margin-bottom: 20px; overflow-x: auto; padding-bottom: 5px; scrollbar-width: none; -ms-overflow-style: none;">
                <button onclick="window.setHall('all')" style="width: 170px; padding: 8px 16px; border-radius: 20px; border: 1px solid #3b82f6; cursor: pointer; white-space: nowrap; transition: all 0.2s; outline: none; ${activeHall === 'all' ? 'background: #3b82f6; color: white; font-weight: bold; box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.4);' : 'background: white; color: #3b82f6;'}">Tất cả hội trường</button>
                <button onclick="window.setHall('can-tho')" style="width: 170px; padding: 8px 16px; border-radius: 20px; border: 1px solid #3b82f6; cursor: pointer; white-space: nowrap; transition: all 0.2s; outline: none; ${activeHall === 'can-tho' ? 'background: #3b82f6; color: white; font-weight: bold; box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.4);' : 'background: white; color: #3b82f6;'}">HT Cần Thơ</button>
                <button onclick="window.setHall('hau-giang')" style="width: 170px; padding: 8px 16px; border-radius: 20px; border: 1px solid #3b82f6; cursor: pointer; white-space: nowrap; transition: all 0.2s; outline: none; ${activeHall === 'hau-giang' ? 'background: #3b82f6; color: white; font-weight: bold; box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.4);' : 'background: white; color: #3b82f6;'}">HT Hậu Giang</button>
                <button onclick="window.setHall('soc-trang')" style="width: 170px; padding: 8px 16px; border-radius: 20px; border: 1px solid #3b82f6; cursor: pointer; white-space: nowrap; transition: all 0.2s; outline: none; ${activeHall === 'soc-trang' ? 'background: #3b82f6; color: white; font-weight: bold; box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.4);' : 'background: white; color: #3b82f6;'}">HT Sóc Trăng</button>
                <button onclick="window.setHall('goc-giao-luu-mica')" style="width: 170px; padding: 8px 16px; border-radius: 20px; border: 1px solid #3b82f6; cursor: pointer; white-space: nowrap; transition: all 0.2s; outline: none; ${activeHall === 'goc-giao-luu-mica' ? 'background: #3b82f6; color: white; font-weight: bold; box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.4);' : 'background: white; color: #3b82f6;'}">Góc giao lưu MICA</button>
            </div>
        `;

        // 2. Xử lý logic dữ liệu (Gom hội trường)
        let displaySessions = [];
        if (activeHall === 'all') {
            Object.keys(detailedData).forEach(key => {
                detailedData[key].forEach(session => {
                    displaySessions.push({ ...session, hallKey: key });
                });
            });
            displaySessions.sort((a, b) => a.time.localeCompare(b.time));
        } else {
            displaySessions = (detailedData[activeHall] || []).map(s => ({ ...s, hallKey: activeHall }));
        }

        // 3. Xử lý LỌC TÌM KIẾM (Search Filter)
        if (searchQuery.trim() !== '') {
            const query = searchQuery.trim().toLowerCase();

            displaySessions = displaySessions.reduce((acc, session) => {
                // Kiểm tra xem tiêu đề phiên hoặc danh sách chủ tọa có chứa từ khóa không
                const isTitleMatch = session.title.toLowerCase().includes(query);
                const isChairsMatch = session.chairs.toLowerCase().includes(query);

                // Lọc riêng các bài báo cáo (talks) có chứa từ khóa (ở chủ đề hoặc diễn giả)
                const matchedTalks = session.talks.filter(talk =>
                    talk.topic.toLowerCase().includes(query) ||
                    talk.speaker.toLowerCase().includes(query)
                );

                if (isTitleMatch || isChairsMatch) {
                    // Nếu tìm trúng tên Phiên hoặc Chủ tọa -> Giữ nguyên toàn bộ bài báo cáo bên trong
                    acc.push(session);
                } else if (matchedTalks.length > 0) {
                    // Nếu tìm trúng Diễn giả/Bài cụ thể -> Chỉ hiển thị Phiên đó với các bài được tìm thấy
                    acc.push({ ...session, talks: matchedTalks });
                }

                return acc;
            }, []);
        }

        // 4. Render danh sách ra HTML
        if (displaySessions.length === 0) {
            listContainer.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #6b7280; background: white; border-radius: 8px; border: 1px dashed #cbd5e1; margin-top: 20px;">
                    <svg style="width: 48px; height: 48px; margin: 0 auto 16px auto; color: #9ca3af;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <p style="margin: 0; font-size: 16px;">Không tìm thấy kết quả nào phù hợp.</p>
                </div>
            `;
            return;
        }

        listContainer.innerHTML = displaySessions.map(session => {
            const hall = hallInfo[session.hallKey];
            return `
            <div style="background: white; border-radius: 8px; border: 1px solid #e5e7eb; margin-bottom: 20px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                <div style="background: #1e3a8a; color: white; padding: 12px 16px; display: flex; flex-direction: column; gap: 8px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
                        <div style="font-size: 13px; opacity: 0.9; display: flex; align-items: center; gap: 4px;">
                            <svg style="width: 14px; height: 14px; fill: currentColor;" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path></svg>
                            ${session.time}
                        </div>
                        <span style="background: ${hall.bg}; color: ${hall.color}; border: 1px solid ${hall.border}; padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: bold;">
                            📍 ${hall.name}
                        </span>
                    </div>
                    <div style="font-weight: bold; font-size: 16px; line-height: 1.4;">${highlightText(session.title, searchQuery)}</div>
                </div>

                <div style="padding: 12px 16px; border-bottom: 1px solid #f3f4f6; background: #f8fafc;">
                    <span style="font-weight: bold; font-size: 13px; color: #aa0d0dff;">CHỦ TỌA:</span>
                    <span style="font-size: 13px; color: #aa0d0dff;">${highlightText(session.chairs, searchQuery)}</span>
                    ${session.panelists ? `
                    <div>
                        <span style="font-weight: bold; font-size: 13px; color: #64748b;">THAM LUẬN:</span>
                        <span style="font-size: 13px; color: #1e293b;">${highlightText(session.panelists, searchQuery)}</span>
                    </div>
                    ` : ''}
                </div>

                <div style="padding: 0 16px;">
                    ${session.talks.map(talk => `
                        <div style="display: flex; padding: 12px 0; border-bottom: 1px solid #f3f4f6; gap: 15px; align-items: flex-start;">
                            <div style="min-width: 90px; color: #ef4444; font-weight: 500; font-size: 13px;">${talk.time}</div>
                            <div style="flex: 1;">
                                <div style="font-weight: 500; color: #1f2937; margin-bottom: 4px; line-height: 1.4;">${highlightText(talk.topic, searchQuery)}</div>
                                <div style="font-size: 13px; color: #6b7280;">Báo cáo viên: <span style="color: #3b82f6; font-weight: 500;">${highlightText(talk.speaker, searchQuery)}</span></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `}).join('');
    }

    // Hàm global để nút bấm chọn Tab Hội trường gọi được
    window.setHall = (hallId) => {
        activeHall = hallId;
        updateChiTietView(); // Cập nhật lại view mà không làm mất text trong ô search
    };

    const htmlTongQuan = `
        <div class="ribbon-title">Chương trình tổng quan</div>
        <div class="mica-content-wrapper">
            <div class="mica-table-card">
                <div class="mica-table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th style="background-color: #cbd5e1; width: 8%; text-align: center;">Phiên</th>
                                <th style="background-color: #fed7aa; width: 23%; text-align: center;">Hội Trường Cần Thơ</th>
                                <th style="background-color: #fef08a; width: 23%; text-align: center;">Hội Trường Hậu Giang</th>
                                <th style="background-color: #bbf7d0; width: 23%; text-align: center;">Hội Trường Sóc Trăng</th>
                                <th style="background-color: #bfdbfe; width: 23%; text-align: center;">Góc Giao Lưu MICA</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style="background-color: #b48600; color: white;">
                                <td colspan="5" style="text-align: center; font-size: 16px; font-weight: bold; padding: 10px; border-top: 16px solid white;">8h00 - 8h30: Lễ khai mạc</td>
                            </tr>
                            <tr>
                                <td style="text-align: center; font-weight: bold; vertical-align: middle; background-color: #f3f4f6;">Phiên 1</td>
                                <td style="background-color: #fed7aa;">KỶ NGUYÊN BÓNG PHỦ THUỐC TRONG CAN THIỆP MẠCH VÀNH</td>
                                <td style="background-color: #fef08a;">ĐÁNH GIÁ NGUY CƠ SỚM ĐẾN KIỂM SOÁT NGUY CƠ TỒN DƯ</td>
                                <td style="background-color: #bbf7d0;">VAI TRÒ CAN THIỆP SỚM ĐỂ CẢI THIỆN TIÊN LƯỢNG HỘI CHỨNG TIM - THẬN - CHUYỂN HÓA</td>
                                <td style="background-color: #bfdbfe;">TỐI ƯU HÓA ĐIỀU TRỊ: GÓC NHÌN TỪ QUẢN LÝ BỆNH VIỆN ĐẾN HỆ THỐNG Y TẾ</td>
                            </tr>
                            <tr>
                                <td style="text-align: center; font-weight: bold; vertical-align: middle; background-color: #f3f4f6;">Phiên 2</td>
                                <td style="background-color: #fed7aa;">CHIẾN LƯỢC CAN THIỆP SANG THƯƠNG PHỨC TẠP</td>
                                <td style="background-color: #fef08a;">TIẾP CẬN MỚI TĂNG HUYẾT ÁP VÀ YẾU TỐ NGUY CƠ</td>
                                <td style="background-color: #bbf7d0;">CAN THIỆP CTO: KHI NÀO, BẰNG CÁCH NÀO?</td>
                                <td style="background-color: #bfdbfe;">TỪ KHUYẾN CÁO ĐẾN CA LÂM SÀNG</td>
                            </tr>
                            <tr>
                                <td style="text-align: center; font-weight: bold; vertical-align: middle; background-color: #f3f4f6;">Phiên 3</td>
                                <td style="background-color: #fed7aa;">LIVE CASE IN A BOX: COMPLEX PCI</td>
                                <td style="background-color: #fef08a;">ĐIỀU TRỊ TOÀN DIỆN SUY TIM</td>
                                <td style="background-color: #bbf7d0;">THÁCH THỨC VÀ CHIẾN LƯỢC TỐI ƯU HÓA ĐIỀU TRỊ RUNG NHĨ</td>
                                <td style="background-color: #bfdbfe;">TỪ CHUẨN BỊ ĐẾN LÀM CHỦ CAN THIỆP</td>
                            </tr>
                            <tr>
                                <td style="text-align: center; font-weight: bold; vertical-align: middle; background-color: #f3f4f6;">Phiên 4</td>
                                <td style="background-color: #fed7aa;">TIẾP CẬN TOÀN DIỆN TỔN THƯƠNG MV VÔI HÓA NẶNG</td>
                                <td style="background-color: #fef08a;"></td>
                                <td style="background-color: #bbf7d0;">CAN THIỆP BỆNH TIM CẤU TRÚC: XU HƯỚNG CẬP NHẬT</td>
                                <td style="background-color: #bfdbfe;">NGHIÊN CỨU KHOA HỌC</td>
                            </tr>
                            <tr>
                                <td style="text-align: center; font-weight: bold; vertical-align: middle; background-color: #f3f4f6;">Phiên 5</td>
                                <td style="background-color: #fed7aa;">LIVE CASE IN A BOX: CALCIFIED LESIONS</td>
                                <td style="background-color: #fef08a;">HỘI CHỨNG TIM – THẬN – CHUYỂN HÓA: TIẾP CẬN TÍCH HỢP VÀ ĐIỀU TRỊ TOÀN DIỆN</td>
                                <td style="background-color: #bbf7d0;">CAN THIỆP VAN VÀ ĐỘNG MẠCH CHỦ: CẬP NHẬT VÀ KINH NGHIỆM THỰC TIỄN</td>
                                <td style="background-color: #bfdbfe;"></td>
                            </tr>
                            <tr>
                                <td style="text-align: center; font-weight: bold; vertical-align: middle; background-color: #f3f4f6;">Phiên 6</td>
                                <td style="background-color: #fed7aa;">CẬP NHẬT VAI TRÒ HÌNH ẢNH HỌC NỘI MẠCH TRONG PCI</td>
                                <td style="background-color: #fef08a;">ĐIỀU TRỊ BỆNH ĐỘNG MẠCH VÀNH TRONG KỶ NGUYÊN ĐA MỤC TIÊU</td>
                                <td style="background-color: #bbf7d0;">CAN THIỆP MẠCH MÁU NGOẠI BIÊN: ĐỊNH HƯỚNG TƯƠNG LAI</td>
                                <td style="background-color: #bfdbfe;"></td>
                            </tr>
                            <tr>
                                <td style="text-align: center; font-weight: bold; vertical-align: middle; background-color: #f3f4f6;">Phiên 7</td>
                                <td style="background-color: #fed7aa;">LIVE CASE IN A BOX: IMAGE-GUIDED COMPLEX PCI</td>
                                <td style="background-color: #fef08a;">TIẾP CẬN TOÀN DIỆN YẾU TỐ NGOÀI TIM MẠCH ẢNH HƯỞNG ĐẾN KẾT CỤC TIM MẠCH</td>
                                <td style="background-color: #bbf7d0;"></td>
                                <td style="background-color: #bfdbfe;"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    const htmlMauSlide = `<div class="ribbon-title">Mẫu Slide</div>
                            <div class="mica-content-wrapper">
                                <div style="position: relative; background: linear-gradient(to right, #1e3a8a, #be185d); padding: 10px 20px; border-radius: 16px 16px 16px 16px; display: inline-block; font-size: 1.125rem; font-weight: 500; margin: 16px 0 16px 16px; box-shadow: 2px 2px 5px rgba(0,0,0,0.2);"><a style="color: white !important;" href='/files/Template MICA 2026.pptx'> Tải mẫu Slide báo cáo</a></div>
                            </div>`;

    const htmlTaiTro = `<img src="/files/don-vi-tai-tro-mica-2026.jpg" alt="" width="100%">`;

    function renderMenu() {
        const menuList = document.getElementById('mica-menu-list');
        if (!menuList) return;
        menuList.innerHTML = '';

        menus.forEach(menu => {
            const li = document.createElement('li');
            li.className = menu.id === activeMenuId ? 'menu-active' : '';

            // Sử dụng addEventListener (chuẩn của React/JS hiện đại) thay cho onclick
            li.addEventListener('click', () => {
                activeMenuId = menu.id;
                renderMenu();
                renderContent();
            });

            li.innerHTML = `
                <span>${menu.label}</span>
                <svg viewBox="0 0 20 20">
                    <path d="M4 4l12 6-12 6z"></path>
                </svg>
            `;
            menuList.appendChild(li);
        });
    }

    function renderContent() {
        const mainContent = document.getElementById('mica-main-content');
        if (!mainContent) return;

        if (activeMenuId === 'tong-quan') {
            mainContent.innerHTML = htmlTongQuan;
        } else if (activeMenuId === 'chi-tiet' || activeMenuId === 'bao-cao-vien') {
            searchQuery = ''; // Reset thanh tìm kiếm khi đổi menu
            const title = activeMenuId === 'chi-tiet' ? 'Chương trình chi tiết' : 'Chủ tọa & Báo cáo viên';
            const placeholder = activeMenuId === 'chi-tiet' ? 'Tìm diễn giả, bài báo cáo, chủ tọa...' : 'Tìm tên Bác sĩ, chức danh, nơi công tác...';

            // Dựng khung chung có thanh tìm kiếm
            mainContent.innerHTML = `
            <div style="display: flex; align-items: left;">
                <div class="ribbon-title">${title}</div>
                <div class="mica-content-wrapper">
                    <div style="position: relative; background: linear-gradient(to right, #1e3a8a, #be185d); padding: 10px 20px; border-radius: 16px 16px 16px 16px; display: inline-block; font-size: 1.125rem; font-weight: 500; margin: 16px 0 16px 16px; box-shadow: 2px 2px 5px rgba(0,0,0,0.2);"><a style="color: white !important;" href='https://drive.google.com/file/d/13wUcdgHbjxYK4PRYXXkv4-nq_4TMcwM3/view?usp=drive_link'> Tải mẫu Slide báo cáo</a></div>
                </div>
            </div>
                <div style="padding: 0 16px 40px 16px;">
                    <!-- Thanh Tìm Kiếm -->
                    <div style="margin-bottom: 16px; position: relative;">
                        <svg style="position: absolute; left: 14px; top: 12px; width: 18px; height: 18px; color: #9ca3af;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        <input type="text" id="mica-search-input" placeholder="${placeholder}" autocomplete="off" style="width: 100%; padding: 10px 16px 10px 40px; border-radius: 8px; border: 1px solid #cbd5e1; font-size: 14px; outline: none; box-sizing: border-box; box-shadow: 0 1px 2px rgba(0,0,0,0.05); transition: border-color 0.2s;">
                    </div>
                    
                    <!-- Khung Nội dung thay đổi tùy menu -->
                    ${activeMenuId === 'chi-tiet' ? '<div id="mica-hall-tabs"></div><div id="mica-sessions-list"></div>' : ''}
                    ${activeMenuId === 'bao-cao-vien' ? '<div id="mica-speakers-list" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 16px;"></div>' : ''}
                </div>
            `;

            const searchInput = document.getElementById('mica-search-input');
            searchInput.addEventListener('input', (e) => {
                searchQuery = e.target.value;
                if (activeMenuId === 'chi-tiet') updateChiTietView();
                if (activeMenuId === 'bao-cao-vien') updateBaoCaoVienView();
            });

            searchInput.addEventListener('focus', () => searchInput.style.borderColor = '#3b82f6');
            searchInput.addEventListener('blur', () => searchInput.style.borderColor = '#cbd5e1');

            // Gọi render khung chi tiết
            if (activeMenuId === 'chi-tiet') updateChiTietView();
            if (activeMenuId === 'bao-cao-vien') updateBaoCaoVienView();

        } else if (activeMenuId === 'mau-slide') {
            mainContent.innerHTML = htmlMauSlide;
        } else if (activeMenuId === 'don-vi-tai-tro') {
            mainContent.innerHTML = htmlTaiTro;
        } else {
            const currentMenu = menus.find(m => m.id === activeMenuId);
            mainContent.innerHTML = `
                <div class="ribbon-title">${currentMenu.label}</div>
                <div class="mica-empty-container">
                    <div class="mica-empty-box">
                        <svg class="mica-empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                        </svg>
                        <h3>Nội dung đang cập nhật</h3>
                        <p>Thông tin chi tiết cho mục "${currentMenu.label}" sẽ sớm được bổ sung.</p>
                    </div>
                </div>
            `;
        }
    }

    renderMenu();
    renderContent();
})();