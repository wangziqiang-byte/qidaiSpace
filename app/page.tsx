"use client"

import { useState, useMemo } from "react"
import { I18nProvider } from "@/components/providers/i18n-provider"
import { ToastProvider } from "@/components/ui/error-toast"
import { ScreenWrapper } from "@/components/auth/screen-wrapper"
import { OpeningScreen } from "@/components/auth/opening-screen"
import { LoginScreen } from "@/components/auth/login-screen"
import { SignUpScreen } from "@/components/auth/signup-screen"
import { ForgotPasswordScreen } from "@/components/auth/forgot-password-screen"
import { VerifyCodeScreen } from "@/components/auth/verify-code-screen"
import { ResetPasswordScreen } from "@/components/auth/reset-password-screen"
import { PasswordChangedScreen } from "@/components/auth/password-changed-screen"
import { PhoneLoginScreen } from "@/components/auth/phone-login-screen"
import { PhoneVerifyScreen } from "@/components/auth/phone-verify-screen"
import { HelpScreen } from "@/components/auth/help-screen"
import { PrivacyPolicyScreen, TermsOfServiceScreen } from "@/components/auth/legal-screens"
import { NetworkErrorScreen, AccountBannedScreen, AccountLockedScreen, ServerErrorScreen } from "@/components/auth/error-screens"
import { ScreenNavigator } from "@/components/auth/screen-navigator"
import { ChatListScreen } from "@/components/chat/chat-list-screen"

type Screen = 
  | "opening"
  | "login"
  | "signup"
  | "forgot-password"
  | "verify-email"
  | "reset-password"
  | "password-changed"
  | "phone-login"
  | "phone-verify"
  | "help"
  | "privacy"
  | "terms"
  | "network-error"
  | "account-banned"
  | "account-locked"
  | "server-error"
  | "chat-list"

const SCREENS: { id: Screen; label: string }[] = [
  { id: "opening", label: "Welcome" },
  { id: "login", label: "Login" },
  { id: "signup", label: "Sign Up" },
  { id: "forgot-password", label: "Forgot" },
  { id: "verify-email", label: "Verify" },
  { id: "reset-password", label: "Reset" },
  { id: "password-changed", label: "Success" },
  { id: "phone-login", label: "Phone" },
  { id: "phone-verify", label: "OTP" },
  { id: "help", label: "Help" },
  { id: "privacy", label: "Privacy" },
  { id: "terms", label: "Terms" },
  { id: "network-error", label: "Network" },
  { id: "account-locked", label: "Locked" },
  { id: "account-banned", label: "Banned" },
  { id: "chat-list", label: "Chats" },
]

function AuthFlowContent() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("opening")
  const [previousScreen, setPreviousScreen] = useState<Screen>("opening")
  
  const currentIndex = useMemo(() => 
    SCREENS.findIndex(s => s.id === currentScreen), 
    [currentScreen]
  )

  const navigateTo = (screen: Screen) => {
    setPreviousScreen(currentScreen)
    setCurrentScreen(screen)
  }

  const navigateBack = () => {
    setCurrentScreen(previousScreen)
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case "opening":
        return (
          <OpeningScreen
            onSignIn={() => setCurrentScreen("login")}
            onCreateAccount={() => setCurrentScreen("signup")}
            onHelp={() => navigateTo("help")}
          />
        )
      
      case "login":
        return (
          <LoginScreen
            onBack={() => setCurrentScreen("opening")}
            onLogin={() => setCurrentScreen("chat-list")}
            onForgotPassword={() => setCurrentScreen("forgot-password")}
            onSignUp={() => setCurrentScreen("signup")}
            onPhoneLogin={() => setCurrentScreen("phone-login")}
            onHelp={() => navigateTo("help")}
          />
        )
      
      case "signup":
        return (
          <SignUpScreen
            onBack={() => setCurrentScreen("opening")}
            onSignUp={() => setCurrentScreen("chat-list")}
            onLogin={() => setCurrentScreen("login")}
            onHelp={() => navigateTo("help")}
            onTerms={() => navigateTo("terms")}
            onPrivacy={() => navigateTo("privacy")}
          />
        )
      
      case "forgot-password":
        return (
          <ForgotPasswordScreen
            onBack={() => setCurrentScreen("login")}
            onSendCode={() => setCurrentScreen("verify-email")}
            onLogin={() => setCurrentScreen("login")}
            onHelp={() => navigateTo("help")}
          />
        )
      
      case "verify-email":
        return (
          <VerifyCodeScreen
            email="helloworld@gmail.com"
            onBack={() => setCurrentScreen("forgot-password")}
            onVerify={() => setCurrentScreen("reset-password")}
            onHelp={() => navigateTo("help")}
          />
        )
      
      case "reset-password":
        return (
          <ResetPasswordScreen
            onBack={() => setCurrentScreen("verify-email")}
            onReset={() => setCurrentScreen("password-changed")}
            onLogin={() => setCurrentScreen("login")}
            onHelp={() => navigateTo("help")}
          />
        )
      
      case "password-changed":
        return (
          <PasswordChangedScreen
            onBackToLogin={() => setCurrentScreen("login")}
          />
        )
      
      case "phone-login":
        return (
          <PhoneLoginScreen
            onBack={() => setCurrentScreen("login")}
            onContinue={() => setCurrentScreen("phone-verify")}
            onHelp={() => navigateTo("help")}
          />
        )
      
      case "phone-verify":
        return (
          <PhoneVerifyScreen
            phoneNumber="+86 138 0000 0000"
            onBack={() => setCurrentScreen("phone-login")}
            onVerify={() => setCurrentScreen("chat-list")}
            onHelp={() => navigateTo("help")}
          />
        )

      case "help":
        return (
          <HelpScreen
            onBack={navigateBack}
          />
        )

      case "privacy":
        return (
          <PrivacyPolicyScreen
            onBack={navigateBack}
          />
        )

      case "terms":
        return (
          <TermsOfServiceScreen
            onBack={navigateBack}
          />
        )

      case "network-error":
        return (
          <NetworkErrorScreen
            onRetry={() => setCurrentScreen("login")}
            onHelp={() => navigateTo("help")}
          />
        )

      case "account-locked":
        return (
          <AccountLockedScreen
            remainingMinutes={30}
            onHelp={() => navigateTo("help")}
            onBack={() => setCurrentScreen("login")}
          />
        )

      case "account-banned":
        return (
          <AccountBannedScreen
            reason="Violation of Terms of Service"
            onAppeal={() => navigateTo("help")}
            onHelp={() => navigateTo("help")}
          />
        )

      case "server-error":
        return (
          <ServerErrorScreen
            onRetry={() => setCurrentScreen("login")}
            onHelp={() => navigateTo("help")}
          />
        )

      case "chat-list":
        return <ChatListScreen />
      
      default:
        return <OpeningScreen onHelp={() => navigateTo("help")} />
    }
  }

  return (
    <>
      <ScreenWrapper>
        {renderScreen()}
      </ScreenWrapper>
      {/* Development tool - hide in production */}
      {process.env.NODE_ENV === 'development' && (
        <ScreenNavigator
          screens={SCREENS}
          currentIndex={currentIndex}
          onNavigate={(index) => setCurrentScreen(SCREENS[index].id)}
        />
      )}
    </>
  )
}

export default function AuthFlow() {
  return (
    <I18nProvider defaultLanguage="zh">
      <ToastProvider>
        <AuthFlowContent />
      </ToastProvider>
    </I18nProvider>
  )
}
