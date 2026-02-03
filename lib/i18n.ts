"use client"

import { createContext, useContext } from "react"

export type Language = "en" | "zh"

export const translations = {
  en: {
    // Opening Screen
    opening: {
      title: "Explore the app",
      description: "Now your finances are in one place and always under control",
      signIn: "Sign In",
      createAccount: "Create account",
    },
    // Login Screen
    login: {
      title: "Hi, Welcome!",
      emailLabel: "Email address",
      emailPlaceholder: "Your email",
      passwordLabel: "Password",
      passwordPlaceholder: "Password",
      forgotPassword: "Forgot password?",
      loginButton: "Log in",
      orWith: "Or with",
      phone: "Phone",
      noAccount: "Don't have an account?",
      signUp: "Sign up",
      errors: {
        invalidEmail: "Please enter a valid email address",
        invalidPassword: "Password must be at least 8 characters",
        wrongCredentials: "Email or password is incorrect",
        accountLocked: "Account locked. Please try again in {minutes} minutes",
        accountBanned: "Account has been suspended",
        networkError: "Network error. Please check your connection",
        serverError: "Server error. Please try again later",
      },
    },
    // Sign Up Screen
    signup: {
      title: "Create account",
      usernameLabel: "Username",
      usernamePlaceholder: "Your username",
      emailLabel: "Email",
      emailPlaceholder: "Your email",
      passwordLabel: "Password",
      passwordPlaceholder: "Create password",
      confirmPasswordLabel: "Confirm Password",
      confirmPasswordPlaceholder: "Repeat password",
      acceptTerms: "I accept the",
      termsLink: "Terms of Service",
      and: "and",
      privacyLink: "Privacy Policy",
      signUpButton: "Sign Up",
      hasAccount: "Already have an account?",
      logIn: "Log in",
      passwordStrength: {
        weak: "Weak",
        medium: "Medium",
        strong: "Strong",
      },
      passwordRequirements: {
        length: "At least 8 characters",
        uppercase: "One uppercase letter",
        lowercase: "One lowercase letter",
        number: "One number",
        special: "One special character (!@#$%^&*)",
      },
      errors: {
        usernameTaken: "Username is already taken",
        emailTaken: "Email is already registered",
        weakPassword: "Password is too weak",
        passwordMismatch: "Passwords do not match",
        termsRequired: "Please accept the terms to continue",
      },
    },
    // Forgot Password Screen
    forgotPassword: {
      title: "Forgot password?",
      description: "Don't worry! It happens. Please enter the email associated with your account.",
      emailLabel: "Email address",
      emailPlaceholder: "Enter your email address",
      sendCode: "Send code",
      rememberPassword: "Remember password?",
      logIn: "Log in",
      errors: {
        emailNotFound: "No account found with this email",
        tooManyAttempts: "Too many attempts. Please try again in {minutes} minutes",
      },
    },
    // Verify Code Screen
    verifyCode: {
      titleEmail: "Please check your email",
      titlePhone: "Enter code",
      descriptionEmail: "We've sent a code to",
      descriptionPhone: "We've sent an SMS with an activation code to your phone",
      verify: "Verify",
      sendAgain: "Send code again",
      resend: "Resend",
      errors: {
        invalidCode: "Invalid verification code",
        expiredCode: "Code has expired. Please request a new one",
        tooManyAttempts: "Too many attempts. Please try again later",
      },
    },
    // Phone Verify Screen
    phoneVerify: {
      title: "Verify your phone number",
      description: "We've sent an SMS with an activation code to your phone",
      didntReceive: "I didn't receive a code",
      resend: "Resend",
      verify: "Verify",
    },
    // Reset Password Screen
    resetPassword: {
      title: "Reset password",
      description: "Please type something you'll remember",
      newPasswordLabel: "New password",
      newPasswordPlaceholder: "must be 8 characters",
      confirmPasswordLabel: "Confirm new password",
      confirmPasswordPlaceholder: "repeat password",
      resetButton: "Reset password",
      hasAccount: "Already have an account?",
      logIn: "Log in",
      errors: {
        passwordMismatch: "Passwords do not match",
        sameAsOld: "New password cannot be the same as old password",
      },
    },
    // Password Changed Screen
    passwordChanged: {
      title: "Password changed",
      description: "Your password has been changed successfully",
      backToLogin: "Back to login",
    },
    // Phone Login Screen
    phoneLogin: {
      title: "Log in",
      description: "Please confirm your country code and enter your phone number.",
      syncContacts: "Sync Contacts",
      continue: "Continue",
      errors: {
        invalidPhone: "Please enter a valid phone number",
        phoneTaken: "This phone number is already registered",
      },
    },
    // Help Screen
    help: {
      title: "Help & Support",
      description: "We're here to help you with any questions or concerns",
      contactUs: "Contact Us",
      email: "Email",
      emailValue: "support@financeapp.com",
      phone: "Phone",
      phoneValue: "+1 (800) 123-4567",
      workingHours: "Working Hours",
      workingHoursValue: "Mon - Fri, 9:00 AM - 6:00 PM (EST)",
      faq: "Frequently Asked Questions",
      faqItems: [
        { q: "How do I reset my password?", a: "Go to the login page and click 'Forgot password?' to receive a reset code via email." },
        { q: "Why is my account locked?", a: "Your account may be locked after multiple failed login attempts. Please wait 30 minutes or contact support." },
        { q: "How do I contact support?", a: "You can email us at support@financeapp.com or call our hotline during working hours." },
      ],
      backButton: "Back",
    },
    // Common
    common: {
      loading: "Loading...",
      error: "Error",
      success: "Success",
      retry: "Retry",
      cancel: "Cancel",
      confirm: "Confirm",
      help: "Help",
      back: "Back",
    },
    // Error Messages
    errors: {
      network: "Network connection failed. Please check your internet and try again.",
      timeout: "Request timed out. Please try again.",
      server: "Server is temporarily unavailable. Please try again later.",
      unknown: "An unexpected error occurred. Please try again.",
    },
    // Chat Screen
    chat: {
      history: "History",
      pullDown: "Pull down for more",
      pullUp: "Pull up to refresh",
      dock: {
        contacts: "Contacts",
        chat: "Chat",
        settings: "Settings",
      },
    },
  },
  zh: {
    // Opening Screen
    opening: {
      title: "探索应用",
      description: "您的财务现在集中在一个地方，随时掌控",
      signIn: "登录",
      createAccount: "创建账户",
    },
    // Login Screen
    login: {
      title: "欢迎回来！",
      emailLabel: "邮箱地址",
      emailPlaceholder: "请输入邮箱",
      passwordLabel: "密码",
      passwordPlaceholder: "请输入密码",
      forgotPassword: "忘记密码？",
      loginButton: "登录",
      orWith: "其他登录方式",
      phone: "手机号登录",
      noAccount: "还没有账户？",
      signUp: "立即注册",
      errors: {
        invalidEmail: "请输入有效的邮箱地址",
        invalidPassword: "密码至少需要8个字符",
        wrongCredentials: "邮箱或密码错误",
        accountLocked: "账户已锁定，请在 {minutes} 分钟后重试",
        accountBanned: "账户已被封禁",
        networkError: "网络错误，请检查网络连接",
        serverError: "服务器错误，请稍后重试",
      },
    },
    // Sign Up Screen
    signup: {
      title: "创建账户",
      usernameLabel: "用户名",
      usernamePlaceholder: "请输入用户名",
      emailLabel: "邮箱",
      emailPlaceholder: "请输入邮箱",
      passwordLabel: "密码",
      passwordPlaceholder: "创建密码",
      confirmPasswordLabel: "确认密码",
      confirmPasswordPlaceholder: "再次输入密码",
      acceptTerms: "我已阅读并同意",
      termsLink: "服务条款",
      and: "和",
      privacyLink: "隐私政策",
      signUpButton: "注册",
      hasAccount: "已有账户？",
      logIn: "立即登录",
      passwordStrength: {
        weak: "弱",
        medium: "中",
        strong: "强",
      },
      passwordRequirements: {
        length: "至少8个字符",
        uppercase: "包含大写字母",
        lowercase: "包含小写字母",
        number: "包含数字",
        special: "包含特殊字符 (!@#$%^&*)",
      },
      errors: {
        usernameTaken: "用户名已被占用",
        emailTaken: "邮箱已被注册",
        weakPassword: "密码强度太弱",
        passwordMismatch: "两次输入的密码不一致",
        termsRequired: "请同意服务条款以继续",
      },
    },
    // Forgot Password Screen
    forgotPassword: {
      title: "忘记密码？",
      description: "别担心！这很常见。请输入您账户关联的邮箱地址。",
      emailLabel: "邮箱地址",
      emailPlaceholder: "请输入邮箱地址",
      sendCode: "发送验证码",
      rememberPassword: "想起密码了？",
      logIn: "去登录",
      errors: {
        emailNotFound: "未找到使用此邮箱的账户",
        tooManyAttempts: "尝试次数过多，请在 {minutes} 分钟后重试",
      },
    },
    // Verify Code Screen
    verifyCode: {
      titleEmail: "请查收邮件",
      titlePhone: "输入验证码",
      descriptionEmail: "我们已发送验证码至",
      descriptionPhone: "我们已发送短信验证码到您的手机",
      verify: "验证",
      sendAgain: "重新发送",
      resend: "重发",
      errors: {
        invalidCode: "验证码错误",
        expiredCode: "验证码已过期，请重新获取",
        tooManyAttempts: "尝试次数过多，请稍后再试",
      },
    },
    // Phone Verify Screen
    phoneVerify: {
      title: "验证手机号",
      description: "我们已发送短信验证码到您的手机",
      didntReceive: "没有收到验证码？",
      resend: "重新发送",
      verify: "验证",
    },
    // Reset Password Screen
    resetPassword: {
      title: "重置密码",
      description: "请设置一个您能记住的密码",
      newPasswordLabel: "新密码",
      newPasswordPlaceholder: "至少8个字符",
      confirmPasswordLabel: "确认新密码",
      confirmPasswordPlaceholder: "再次输入密码",
      resetButton: "重置密码",
      hasAccount: "已有账户？",
      logIn: "去登录",
      errors: {
        passwordMismatch: "两次输入的密码不一致",
        sameAsOld: "新密码不能与旧密码相同",
      },
    },
    // Password Changed Screen
    passwordChanged: {
      title: "密码已更改",
      description: "您的密码已成功更改",
      backToLogin: "返回登录",
    },
    // Phone Login Screen
    phoneLogin: {
      title: "登录",
      description: "请确认国家代码并输入您的手机号码。",
      syncContacts: "同步通讯录",
      continue: "继续",
      errors: {
        invalidPhone: "请输入有效的手机号码",
        phoneTaken: "该手机号已被注册",
      },
    },
    // Help Screen
    help: {
      title: "帮助与支持",
      description: "我们随时为您解答任何问题",
      contactUs: "联系我们",
      email: "邮箱",
      emailValue: "support@financeapp.com",
      phone: "电话",
      phoneValue: "+86 400-123-4567",
      workingHours: "工作时间",
      workingHoursValue: "周一至周五 9:00 - 18:00",
      faq: "常见问题",
      faqItems: [
        { q: "如何重置密码？", a: "在登录页面点击“忘记密码？”通过邮箱接收重置验证码。" },
        { q: "为什么我的账户被锁定了？", a: "多次登录失败后账户会被暂时锁定。请等待30分钟或联系客服。" },
        { q: "如何联系客服？", a: "您可以发送邮件至 support@financeapp.com 或在工作时间拨打客服热线。" },
      ],
      backButton: "返回",
    },
    // Common
    common: {
      loading: "加载中...",
      error: "错误",
      success: "成功",
      retry: "重试",
      cancel: "取消",
      confirm: "确认",
      help: "帮助",
      back: "返回",
    },
    // Error Messages
    errors: {
      network: "网络连接失败，请检查网络后重试。",
      timeout: "请求超时，请重试。",
      server: "服务器暂时不可用，请稍后重试。",
      unknown: "发生未知错误，请重试。",
    },
    // Chat Screen
    chat: {
      history: "历史记录",
      pullDown: "下拉查看更多",
      pullUp: "上拉刷新",
      dock: {
        contacts: "联系人",
        chat: "聊天",
        settings: "设置",
      },
    },
  },
} as const

export type Translations = typeof translations.en

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

export const I18nContext = createContext<I18nContextType>({
  language: "en",
  setLanguage: () => {},
  t: translations.en,
})

export function useI18n() {
  return useContext(I18nContext)
}
