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
      th_key_signup: 'Sign Up',
      th_key_signin: 'Sign In',
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
    },
  },
  vi: {
    translation: {
      //
      th_key_main_switch_lang: 'Tiếng Việt',
      //
      th_key_signup: 'Đăng ký',
      th_key_signin: 'Đăng nhập',
      //
      th_key_navbar_becometasker: 'Nhận việc',
      th_key_navbar_signup_login: 'Đăng ký / Đăng nhập',
      th_key_navbar_services: 'Dịch vụ',
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
