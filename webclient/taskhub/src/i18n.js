import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// import enTranslation from '../public/locales/en/translation.json';
// import viTranslation from '../public/locales/vi/translation.json';

const resources = {
  en: {
    translation: {
      //
      th_key_main_switch_lang: 'English',
      //
      th_task_errands: 'Errands',
      th_task_cleaning: 'Cleaning',
      th_task_electricalhelp: 'Electrical help',
      th_task_helpmoving: 'Help moving',
      th_task_generalmounting: 'General mounting',
      //
      th_key_signup: 'Sign Up',
      th_key_signin: 'Sign In',
      th_key_logout: 'Log out',
      th_key_person_information: 'Personal',
      th_key_change_password: 'Change password',
      th_key_person_wallet: 'My Wallet',
      th_key_setting: 'Settings',
      th_key_post: 'Post',
      th_key_workphotos: 'Work photos',
      //
      th_key_btn_save: 'Save',
      th_key_btn_cancel: 'Cancel',
      th_key_btn_close: 'Close',
      th_key_btn_post: 'Create new post',
      th_key_btn_update: 'Update',
      th_key_btn_send_invitation: 'Send invitation',
      th_key_firstname: 'First name',
      th_key_lastname: 'Last name',
      th_key_email: 'Email address',
      th_key_dateofbirth: 'Date of birth',
      th_key_phonenumber: 'Phone number',
      th_key_gender: 'Gender',
      th_key_gender_male: 'Male',
      th_key_gender_female: 'Female',
      //
      th_key_navbar_becometasker: 'Become a Tasker',
      th_key_navbar_signup_login: 'Sign up / Log in',
      th_key_navbar_services: 'Task List',
      th_key_navbar_task_feed: 'Task Feed',
      //
      th_key_home_help_search_title: 'What do you need help with ?',
      th_key_home_help_search_place_holder:
        'Select the task you need help with...',
      th_key_home_popular_task: 'Popular task',
      th_key_home_finding_now: 'Get help',
      th_key_home_avg_price: 'AVG Price',
      //
      th_key_finding_step_describe: 'Describe your task',
      th_key_finding_step_taskerlist: 'Browse Taskers & prices',
      th_key_finding_step_choosingdate: 'Choose date & time',
      th_key_finding_step_booking: 'Booking',
      th_key_city: 'City',
      th_key_capital: 'Capital',
      th_key_select_city: 'Select City',
      th_key_select_district: 'Select District',
      th_key_district_type1: 'District',
      th_key_district_type2: 'District',
      th_key_district_type3: 'District',
      th_key_btn_view_profile_review: 'View Profile & Review',
      th_key_btn_select_continue: 'Select & Continue',
      th_key_btn_read_more: 'Read more',
      th_key_hr: 'hr',
      th_key_vhc: 'Vehicle',
      th_key_vhc_bike: 'Bike',
      th_key_vhc_truck: 'Truck',
      th_key_vhc_car: 'Car',
      th_key_how_i_can_help: 'How I can help',
      th_key_about_me: 'About me',
      th_key_tasklist_tab_current: 'Current',
      th_key_tasklist_tab_invation: 'Invationed',
      th_key_tasklist_tab_finish: 'Finished',
      th_key_tasklist_manage: 'Manage task list',
      th_key_tasklist_btn_view_detail: 'View detail',
      th_key_payment_perhour: 'Hourly Wage',
      th_key_payment_onetime: 'Salary',
      //
      th_key_nodata: 'No record(s) found',
      th_key_task: 'Task',
      th_key_worklocation: 'Work Location',
      th_key_address: 'Address',
      th_key_worktime: 'Working time',
      th_key_workdatetime: 'Working date',
      th_key_price: 'Price',
      th_key_paymentmethod: 'Payroll method',
      th_key_paymentplan: 'Payment plan',
      th_key_desc: 'Description',
      th_key_predict_amount: 'Predict the amount of money to be paid',
      //
      th_post_btn_view_candidate: 'List of candidate',
      th_post_candidate_list: 'List of candidate',
      th_post_suggest_price: 'Quoted price',
      th_post_intro_seft_to_post: 'What i can do',
      th_key_not_reated_yet: 'Not reated yet',
      th_post_add_new_post: 'Create new post',
      th_post_edit_post: 'Update post',
    },
  },
  vi: {
    translation: {
      //
      th_key_main_switch_lang: 'Tiếng Việt',
      //
      th_task_errands: 'Việc vặt',
      th_task_cleaning: 'Dọn dẹp',
      th_task_electricalhelp: 'Sửa điện',
      th_task_helpmoving: 'Hỗ trợ vận chuyển',
      th_task_generalmounting: 'Lắp đặt',
      //
      th_key_signup: 'Đăng ký',
      th_key_signin: 'Đăng nhập',
      th_key_logout: 'Đăng xuất',
      th_key_btn_send_invitation: 'Gởi lời mời',
      th_key_change_password: 'Đổi mật khẩu',
      th_key_person_information: 'Thông tin cá nhân',
      th_key_person_wallet: 'Ví của tôi',
      th_key_setting: 'Cài đặt',
      th_key_post: 'Bài đăng',
      th_key_workphotos: 'Hình ảnh làm việc',
      //
      th_key_btn_save: 'Lưu',
      th_key_btn_cancel: 'Hủy',
      th_key_btn_close: 'Đóng',
      th_key_btn_post: 'Đăng bài',
      th_key_btn_update: 'Cập nhật',
      th_key_firstname: 'Tên',
      th_key_lastname: 'Họ',
      th_key_email: 'Email',
      th_key_dateofbirth: 'Ngày sinh',
      th_key_phonenumber: 'Số điện thoại',
      th_key_gender: 'Giới tính',
      th_key_gender_male: 'Nam',
      th_key_gender_female: 'Nữ',
      //
      th_key_navbar_becometasker: 'Nhận việc',
      th_key_navbar_signup_login: 'Đăng ký / Đăng nhập',
      th_key_navbar_services: 'Quản lý việc',
      th_key_navbar_task_feed: 'Bảng tin việc',
      //
      th_key_home_help_search_title: 'Bạn cần giúp đỡ gì ?',
      th_key_home_help_search_place_holder: 'Chọn công việc bạn cần giúp đỡ...',
      th_key_home_popular_task: 'Các công việc phổ biến',
      th_key_home_finding_now: 'Tìm ngay',
      th_key_home_avg_price: 'Giá trung bình',
      //
      th_key_finding_step_describe: 'Mô tả công việc',
      th_key_finding_step_taskerlist: 'Duyệt người nhận việc',
      th_key_finding_step_choosingdate: 'Chọn thời gian',
      th_key_finding_step_booking: 'Đặt lịch',
      th_key_city: 'Thành Phố',
      th_key_capital: '',
      th_key_select_city: 'Chọn thành phố',
      th_key_select_district: 'Chọn Quận/ Huyện',
      th_key_district_type1: 'Quận',
      th_key_district_type2: 'Huyện',
      th_key_district_type3: 'Thị Xã',
      th_key_btn_view_profile_review: 'Xem thông tin & đánh giá',
      th_key_btn_select_continue: 'Chọn & Tiếp tục',
      th_key_btn_read_more: 'Read more',
      th_key_hr: 'giờ',
      th_key_vhc: 'Phương tiện',
      th_key_vhc_bike: 'Xe máy',
      th_key_vhc_truck: 'Xe tải',
      th_key_vhc_car: 'Xe hơi',
      th_key_how_i_can_help: 'Tôi có thể giúp gì',
      th_key_about_me: 'Giới thiệu',
      th_key_tasklist_tab_current: 'Hiện tại',
      th_key_tasklist_tab_invation: 'Đã gửi lời mời',
      th_key_tasklist_tab_finish: 'Đã hoàn thành',
      th_key_tasklist_manage: 'Quản lý danh sách công việc',
      th_key_tasklist_btn_view_detail: 'Xem chi tiết',
      th_key_payment_perhour: 'Theo giờ',
      th_key_payment_onetime: 'Một lần',
      //
      th_key_nodata: 'Không có dữ liệu',
      th_key_task: 'Công việc',
      th_key_worklocation: 'Khu vực',
      th_key_address: 'Địa chỉ',
      th_key_worktime: 'Thời gian làm việc',
      th_key_workdatetime: 'Ngày làm việc',
      th_key_price: 'Giá',
      th_key_paymentmethod: 'Hình thức trả lương',
      th_key_paymentplan: 'Phương thức thanh toán',
      th_key_desc: 'Mô tả',
      th_key_predict_amount: 'Ước tính giá cho công việc này',
      //
      th_post_btn_view_candidate: 'Xem danh sách ứng viên',
      th_post_candidate_list: 'Danh sách ứng viên',
      th_post_suggest_price: 'Giá đề xuất',
      th_post_intro_seft_to_post: 'Tôi có thể giúp gì',
      th_key_not_reated_yet: 'Chưa có đánh giá',
      th_post_add_new_post: 'Tạo bài đăng',
      th_post_edit_post: 'Chỉnh sửa bài đăng',
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'vi',
    debug: true,
    interpolation: {
      escapeValue: false, // not needed for React as it escapes by default
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    detection: {
      order: ['localStorage', 'navigator'],
    },
    // Add other configuration options as needed
  });

export default i18n;
