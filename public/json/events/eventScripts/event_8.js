(function () {
    const micaComponent = document.getElementById('mica-program-component');
    if (!micaComponent) return;

    const menus = [
        { id: 'tong-quan', label: 'Chương trình tổng quan' },
        { id: 'chi-tiet', label: 'Chương trình chi tiết' },
        { id: 'phien-khoa-hoc', label: 'Các phiên khoa học' },
        { id: 'ca-lam-sang', label: 'Ca lâm sàng trực tiếp' },
        { id: 'mau-slide', label: 'Mẫu Slide' },
        { id: 'tai-chuong-trinh', label: 'Tải chương trình' },
        { id: 'tai-tai-lieu', label: 'Tải tài liệu' }
    ];

    let activeMenuId = 'tong-quan';
    let activeHall = 'all'; // Đổi mặc định thành "Tất cả" khi vào chương trình chi tiết
    let searchQuery = '';   // Biến lưu trữ từ khóa tìm kiếm

    // Thông tin màu sắc và tên hiển thị cho các thẻ Nhãn (Badge) định vị
    const hallInfo = {
        'can-tho': { name: 'HT Cần Thơ', color: '#1d4ed8', bg: '#dbeafe', border: '#bfdbfe' }, // Xanh dương
        'hau-giang': { name: 'HT Hậu Giang', color: '#047857', bg: '#d1fae5', border: '#a7f3d0' }, // Xanh lá
        'soc-trang': { name: 'HT Sóc Trăng', color: '#b45309', bg: '#fef3c7', border: '#fde68a' }  // Vàng cam
    };

    // Dữ liệu chi tiết trích xuất từ CSV
    const detailedData = {
        'can-tho': [
            {
                time: '08:30 - 10:00',
                title: 'KỶ NGUYÊN BÓNG PHỦ THUỐC TRONG CAN THIỆP MẠCH VÀNH',
                chairs: 'PGs.Ts. Hồ Thượng Dũng - Gs.Ts. Hoàng Anh Tiến - PGs.Ts. Phạm Mạnh Hùng',
                talks: [
                    { time: '08:30 - 08:42', topic: 'Xu hướng chẩn đoán điều trị tăng huyết áp 2026', speaker: 'PGS.TS.BS. Trần Văn Huy' },
                    { time: '08:42 - 08:54', topic: 'Thuốc ức chế SGLT2: Cập nhật chiến lược bảo vệ tim - thận', speaker: 'TS.BS. Nguyễn Văn Tân' },
                    { time: '08:54 - 09:06', topic: 'Vai trò của IVUS trong can thiệp động mạch vành phức tạp', speaker: 'PGs.Ts. Đỗ Văn Chiến' }
                ]
            },
            {
                time: '10:30 - 12:00',
                title: 'QUẢN LÝ TOÀN DIỆN HỘI CHỨNG VÀNH CẤP',
                chairs: 'Gs.Ts. Võ Thành Nhân - TS.BS. Chu Dũng Quyết',
                talks: [
                    { time: '10:30 - 10:45', topic: 'Dự phòng suy tim sau nhồi máu cơ tim', speaker: 'PGS.TS. Hoàng Văn Sỹ' },
                    { time: '10:45 - 11:00', topic: 'Tối ưu hóa kháng kết tập tiểu cầu', speaker: 'TS.BS. Trương Phi Hùng' }
                ]
            }
        ],
        'hau-giang': [
            {
                time: '08:30 - 09:53',
                title: 'ĐÁNH GIÁ NGUY CƠ SỚM ĐẾN KIỂM SOÁT NGUY CƠ TỒN DƯ',
                chairs: 'PGs.Ts. Nguyễn Văn Trí - PGs.Ts. Trần Kim Trang',
                talks: [
                    { time: '08:30 - 08:42', topic: 'Quản lý Lipid máu ở bệnh nhân nguy cơ rất cao', speaker: 'ThS.BS. Lê Minh Thắng' },
                    { time: '08:42 - 08:54', topic: 'Vị trí của chẹn beta trong quản lý hội chứng vành mạn', speaker: 'BsCKII. Phạm Thanh Phong' }
                ]
            }
        ],
        'soc-trang': [
            {
                time: '08:30 - 09:46',
                title: 'VAI TRÒ CAN THIỆP SỚM ĐỂ CẢI THIỆN TIÊN LƯỢNG',
                chairs: 'Gs.Ts. Trương Quang Bình - PGs.Ts. Nguyễn Ngọc Quang',
                talks: [
                    { time: '08:30 - 08:45', topic: 'Can thiệp thân chung động mạch vành trái', speaker: 'TS.BS. Vũ Hoàng Vũ' }
                ]
            }
        ]
    };

    // Hàm tô màu chữ (highlight) khi tìm kiếm
    function highlightText(text, query) {
        if (!query || query.trim() === '') return text;
        // Thoát các ký tự đặc biệt trong Regex để tránh lỗi
        const escapedQuery = query.trim().replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        const regex = new RegExp(`(${escapedQuery})`, 'gi');
        return text.replace(regex, '<mark style="background-color: #fef08a; padding: 0 2px; border-radius: 2px; color: #1f2937;">$1</mark>');
    }

    // Hàm chỉ render lại các Tabs và Nội dung danh sách (để không làm mất focus thanh tìm kiếm)
    function updateChiTietView() {
        const tabsContainer = document.getElementById('mica-hall-tabs');
        const listContainer = document.getElementById('mica-sessions-list');

        if (!tabsContainer || !listContainer) return;

        // 1. Cập nhật giao diện Tabs
        tabsContainer.innerHTML = `
            <div style="display: flex; gap: 10px; margin-bottom: 20px; overflow-x: auto; padding-bottom: 5px; scrollbar-width: none; -ms-overflow-style: none;">
                <button onclick="window.setHall('all')" style="padding: 8px 16px; border-radius: 20px; border: 1px solid #3b82f6; cursor: pointer; white-space: nowrap; transition: all 0.2s; outline: none; ${activeHall === 'all' ? 'background: #3b82f6; color: white; font-weight: bold; box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.4);' : 'background: white; color: #3b82f6;'}">Tất cả hội trường</button>
                <button onclick="window.setHall('can-tho')" style="padding: 8px 16px; border-radius: 20px; border: 1px solid #3b82f6; cursor: pointer; white-space: nowrap; transition: all 0.2s; outline: none; ${activeHall === 'can-tho' ? 'background: #3b82f6; color: white; font-weight: bold; box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.4);' : 'background: white; color: #3b82f6;'}">HT Cần Thơ</button>
                <button onclick="window.setHall('hau-giang')" style="padding: 8px 16px; border-radius: 20px; border: 1px solid #3b82f6; cursor: pointer; white-space: nowrap; transition: all 0.2s; outline: none; ${activeHall === 'hau-giang' ? 'background: #3b82f6; color: white; font-weight: bold; box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.4);' : 'background: white; color: #3b82f6;'}">HT Hậu Giang</button>
                <button onclick="window.setHall('soc-trang')" style="padding: 8px 16px; border-radius: 20px; border: 1px solid #3b82f6; cursor: pointer; white-space: nowrap; transition: all 0.2s; outline: none; ${activeHall === 'soc-trang' ? 'background: #3b82f6; color: white; font-weight: bold; box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.4);' : 'background: white; color: #3b82f6;'}">HT Sóc Trăng</button>
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
                    <span style="font-weight: bold; font-size: 13px; color: #64748b;">CHỦ TỌA:</span>
                    <span style="font-size: 13px; color: #1e293b;">${highlightText(session.chairs, searchQuery)}</span>
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
                                <th style="background-color: #cbd5e1; width: 10%; text-align: center;">Phiên</th>
                                <th style="background-color: #fed7aa; width: 25%; text-align: center;">Hội Trường Cần Thơ</th>
                                <th style="background-color: #fef08a; width: 25%; text-align: center;">Hội Trường Hậu Giang</th>
                                <th style="background-color: #bbf7d0; width: 25%; text-align: center;">Hội Trường Sóc Trăng</th>
                                <th style="background-color: #bfdbfe; width: 15%; text-align: center;">Góc Giao Lưu MICA</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style="background-color: #1e3a8a; color: white;">
                                <td colspan="5" style="text-align: center; font-size: 16px; font-weight: bold; padding: 10px;">Thứ sáu, ngày 15/5/2026 (13-17h)</td>
                            </tr>
                            <tr style="background-color: #f9fafb;">
                                <td style="text-align: center; font-weight: bold; vertical-align: middle; background-color: #f3f4f6;">-</td>
                                <td>
                                    <div style="font-weight: bold;">Báo cáo khoa học</div>
                                    <div style="color: #4b5563; font-size: 12px;">(Tim mạch)</div>
                                </td>
                                <td>
                                    <div style="font-weight: bold;">Báo cáo khoa học</div>
                                    <div style="color: #4b5563; font-size: 12px;">(Tim mạch can thiệp)</div>
                                </td>
                                <td style="background-color: #f9fafb;"></td>
                                <td style="background-color: #f9fafb;"></td>
                            </tr>
                            
                            <tr style="background-color: #b48600; color: white;">
                                <td colspan="5" style="text-align: center; font-size: 16px; font-weight: bold; padding: 10px; border-top: 16px solid white;">Thứ bảy, ngày 16/5/2026 (7-17h)</td>
                            </tr>
                            <tr>
                                <td style="text-align: center; font-weight: bold; vertical-align: middle; background-color: #f3f4f6;">Phiên 1</td>
                                <td>Kỷ nguyên bóng phủ thuốc trong can thiệp mạch vành</td>
                                <td>Đánh giá nguy cơ sớm đến kiểm soát nguy cơ tồn dư</td>
                                <td>Vai trò can thiệp sớm để cải thiện tiên lượng hội chứng tim - thận - chuyển hóa</td>
                                <td>Tối ưu hóa điều trị: góc nhìn từ quản lý bệnh viện đến hệ thống y tế</td>
                            </tr>
                            <tr>
                                <td style="text-align: center; font-weight: bold; vertical-align: middle; background-color: #f3f4f6;">Phiên 2</td>
                                <td>Chiến lược can thiệp sang thương phức tạp</td>
                                <td>Tiếp cận mới tăng huyết áp và yếu tố nguy cơ</td>
                                <td>Can thiệp CTO: khi nào, bằng cách nào?</td>
                                <td>Từ khuyến cáo đến ca lâm sàng</td>
                            </tr>
                            <tr>
                                <td style="text-align: center; font-weight: bold; vertical-align: middle; background-color: #f3f4f6;">Phiên 3</td>
                                <td>Live case in a box: Complex PCI</td>
                                <td>Điều trị toàn diện suy tim</td>
                                <td>Thách thức và chiến lược tối ưu hóa điều trị rung nhĩ</td>
                                <td>Từ chuẩn bị đến làm chủ can thiệp</td>
                            </tr>
                            <tr>
                                <td style="text-align: center; font-weight: bold; vertical-align: middle; background-color: #f3f4f6;">Phiên 4</td>
                                <td>Tiếp cận toàn diện tổn thương MV vôi hóa nặng</td>
                                <td style="background-color: #f9fafb;"></td>
                                <td>Can thiệp bệnh tim cấu trúc: xu hướng cập nhật</td>
                                <td>Nghiên cứu khoa học</td>
                            </tr>
                            <tr>
                                <td style="text-align: center; font-weight: bold; vertical-align: middle; background-color: #f3f4f6;">Phiên 5</td>
                                <td>Live case in a box: Calcified lesions</td>
                                <td>Hội chứng tim – thận – chuyển hóa: tiếp cận tích hợp và điều trị toàn diện</td>
                                <td>Can thiệp van và động mạch chủ: cập nhật và kinh nghiệm thực tiễn</td>
                                <td style="background-color: #f9fafb;"></td>
                            </tr>
                            <tr>
                                <td style="text-align: center; font-weight: bold; vertical-align: middle; background-color: #f3f4f6;">Phiên 6</td>
                                <td>Cập nhật vai trò hình ảnh học nội mạch trong PCI</td>
                                <td>Điều trị bệnh động mạch vành trong kỷ nguyên đa mục tiêu</td>
                                <td>Can thiệp mạch máu ngoại biên: định hướng tương lai</td>
                                <td style="background-color: #f9fafb;"></td>
                            </tr>
                            <tr>
                                <td style="text-align: center; font-weight: bold; vertical-align: middle; background-color: #f3f4f6;">Phiên 7</td>
                                <td>Live case in a box: Image-guided complex PCI</td>
                                <td>Tiếp cận toàn diện yếu tố ngoài tim mạch ảnh hưởng đến kết cục tim mạch</td>
                                <td style="background-color: #f9fafb;"></td>
                                <td style="background-color: #f9fafb;"></td>
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
        } else if (activeMenuId === 'chi-tiet') {
            searchQuery = ''; // Reset thanh tìm kiếm khi mới nhấn vào menu "Chương trình chi tiết"

            // Dựng khung layout chứa ô tìm kiếm (Không bị ghi đè lại khi gõ chữ)
            mainContent.innerHTML = `
                <div class="ribbon-title">Chương trình chi tiết</div>
                <div style="padding: 0 16px 40px 16px;">
                    <!-- Thanh Tìm Kiếm -->
                    <div style="margin-bottom: 16px; position: relative;">
                        <svg style="position: absolute; left: 14px; top: 12px; width: 18px; height: 18px; color: #9ca3af;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        <input type="text" id="mica-search-input" placeholder="Tìm diễn giả, bài báo cáo, chủ tọa..." autocomplete="off" style="width: 100%; padding: 10px 16px 10px 40px; border-radius: 8px; border: 1px solid #cbd5e1; font-size: 14px; outline: none; box-sizing: border-box; box-shadow: 0 1px 2px rgba(0,0,0,0.05); transition: border-color 0.2s;">
                    </div>
                    
                    <!-- Khung chứa Tabs -->
                    <div id="mica-hall-tabs"></div>
                    
                    <!-- Khung chứa Danh sách kết quả -->
                    <div id="mica-sessions-list"></div>
                </div>
            `;

            // Gắn sự kiện (Event Listener) cho ô input tìm kiếm
            const searchInput = document.getElementById('mica-search-input');
            searchInput.addEventListener('input', (e) => {
                searchQuery = e.target.value;
                updateChiTietView(); // Cập nhật lại kết quả tìm kiếm ngay lập tức
            });

            // Hiệu ứng đổi màu viền khi click vào ô search
            searchInput.addEventListener('focus', () => searchInput.style.borderColor = '#3b82f6');
            searchInput.addEventListener('blur', () => searchInput.style.borderColor = '#cbd5e1');

            // Hiển thị nội dung ban đầu
            updateChiTietView();

        } else if (activeMenuId === 'mau-slide') {
            mainContent.innerHTML = htmlMauSlide;
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