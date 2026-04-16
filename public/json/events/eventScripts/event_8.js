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
                                <td>Tim mạch - Đái tháo đường: nguy cơ tim mạch và can thiệp sớm</td>
                                <td>Can thiệp mạch máu ngoại biên hiện đại</td>
                                <td>TAVI: những điều cần cập nhật</td>
                                <td style="background-color: #f9fafb;"></td>
                            </tr>
                            <tr>
                                <td style="text-align: center; font-weight: bold; vertical-align: middle; background-color: #f3f4f6;">Phiên 5</td>
                                <td>Tiếp cận toàn diện tổn thương MV vôi hóa nặng</td>
                                <td style="background-color: #f9fafb;"></td>
                                <td>Can thiệp bệnh tim cấu trúc: xu hướng cập nhật</td>
                                <td>Nghiên cứu khoa học</td>
                            </tr>
                            <tr>
                                <td style="text-align: center; font-weight: bold; vertical-align: middle; background-color: #f3f4f6;">Phiên 6</td>
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
                                <td style="text-align: center; font-weight: bold; vertical-align: middle; background-color: #f3f4f6;">Phiên 6</td>
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
        }
        else if (activeMenuId === 'mau-slide') {
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