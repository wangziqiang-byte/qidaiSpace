"use client"

import { Button } from "@/components/ui/button"
import { BackButton } from "@/components/ui/back-button"
import { StaticLogo } from "@/components/icons/animated-logo"
import { useI18n } from "@/lib/i18n"

interface PrivacyPolicyScreenProps {
  onBack?: () => void
}

export function PrivacyPolicyScreen({ onBack }: PrivacyPolicyScreenProps) {
  const { language } = useI18n()

  const content = language === "zh" ? {
    title: "隐私政策",
    lastUpdated: "最后更新：2024年1月1日",
    sections: [
      {
        title: "1. 信息收集",
        content: "我们收集您在使用服务时提供的个人信息，包括但不限于：姓名、邮箱地址、手机号码、设备信息等。我们仅收集提供服务所必需的最少信息。"
      },
      {
        title: "2. 信息使用",
        content: "我们使用收集的信息来提供、维护和改进我们的服务，包括：验证您的身份、处理交易、发送服务通知、提供客户支持等。"
      },
      {
        title: "3. 信息共享",
        content: "除非获得您的明确同意，我们不会与第三方共享您的个人信息。以下情况除外：遵守法律要求、保护我们的合法权益、防止欺诈等。"
      },
      {
        title: "4. 数据安全",
        content: "我们采用业界标准的安全措施保护您的个人信息，包括数据加密、访问控制、安全审计等。但请注意，没有任何网络传输或存储方式是100%安全的。"
      },
      {
        title: "5. 您的权利",
        content: "您有权访问、更正或删除您的个人信息。如需行使这些权利，请通过我们的客服渠道联系我们。"
      },
      {
        title: "6. Cookie使用",
        content: "我们使用Cookie和类似技术来改善用户体验、分析服务使用情况。您可以通过浏览器设置管理Cookie偏好。"
      },
      {
        title: "7. 未成年人保护",
        content: "我们的服务不面向16岁以下的未成年人。如果我们发现收集了未成年人的个人信息，将立即删除。"
      },
      {
        title: "8. 政策更新",
        content: "我们可能会不时更新本隐私政策。更新后的政策将在本页面发布，重大变更时我们会通过邮件或应用内通知您。"
      }
    ]
  } : {
    title: "Privacy Policy",
    lastUpdated: "Last Updated: January 1, 2024",
    sections: [
      {
        title: "1. Information Collection",
        content: "We collect personal information you provide when using our services, including but not limited to: name, email address, phone number, device information, etc. We only collect the minimum information necessary to provide our services."
      },
      {
        title: "2. Information Use",
        content: "We use collected information to provide, maintain, and improve our services, including: verifying your identity, processing transactions, sending service notifications, and providing customer support."
      },
      {
        title: "3. Information Sharing",
        content: "We do not share your personal information with third parties without your explicit consent, except: to comply with legal requirements, protect our legal rights, prevent fraud, etc."
      },
      {
        title: "4. Data Security",
        content: "We employ industry-standard security measures to protect your personal information, including data encryption, access controls, and security audits. However, no method of transmission or storage is 100% secure."
      },
      {
        title: "5. Your Rights",
        content: "You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us through our customer service channels."
      },
      {
        title: "6. Cookie Usage",
        content: "We use cookies and similar technologies to improve user experience and analyze service usage. You can manage your cookie preferences through your browser settings."
      },
      {
        title: "7. Children's Privacy",
        content: "Our services are not intended for individuals under 16 years of age. If we discover we have collected personal information from a minor, we will delete it immediately."
      },
      {
        title: "8. Policy Updates",
        content: "We may update this privacy policy from time to time. Updated policies will be posted on this page, and we will notify you of significant changes via email or in-app notification."
      }
    ]
  }

  return (
    <div className="flex flex-col min-h-[700px] px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <BackButton onClick={onBack} />
        <StaticLogo size="sm" className="text-foreground" />
      </div>

      {/* Title */}
      <h1 className="font-serif text-3xl font-bold text-foreground tracking-tight mb-2">
        {content.title}
      </h1>
      <p className="text-sm text-muted-foreground mb-6">{content.lastUpdated}</p>

      {/* Content */}
      <div className="flex-1 overflow-y-auto space-y-6 pb-6">
        {content.sections.map((section, index) => (
          <div key={index}>
            <h2 className="text-lg font-semibold text-foreground mb-2">{section.title}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{section.content}</p>
          </div>
        ))}
      </div>

      {/* Back Button */}
      <Button 
        onClick={onBack}
        variant="outline"
        className="w-full h-14 rounded-xl text-base font-medium border-border bg-transparent mt-4"
      >
        {language === "zh" ? "返回" : "Back"}
      </Button>
    </div>
  )
}

interface TermsOfServiceScreenProps {
  onBack?: () => void
}

export function TermsOfServiceScreen({ onBack }: TermsOfServiceScreenProps) {
  const { language } = useI18n()

  const content = language === "zh" ? {
    title: "服务条款",
    lastUpdated: "最后更新：2024年1月1日",
    sections: [
      {
        title: "1. 服务接受",
        content: "通过访问或使用我们的服务，您同意受本服务条款的约束。如果您不同意这些条款，请不要使用我们的服务。"
      },
      {
        title: "2. 账户注册",
        content: "您必须提供准确、完整的注册信息，并保持信息的及时更新。您有责任保护账户安全，对账户下的所有活动负责。"
      },
      {
        title: "3. 服务使用",
        content: "您同意仅将服务用于合法目的，不得进行任何违法或未经授权的活动。禁止使用自动化工具访问服务或干扰服务的正常运行。"
      },
      {
        title: "4. 用户内容",
        content: "您对通过服务发布的内容保留所有权利，但您授予我们使用、展示该内容的许可。您不得发布违法、有害或侵权的内容。"
      },
      {
        title: "5. 知识产权",
        content: "服务及其所有内容、功能和设计均为我们的专有财产，受版权、商标和其他知识产权法律保护。"
      },
      {
        title: "6. 免责声明",
        content: "服务按\"现状\"提供，不提供任何形式的明示或暗示担保。我们不保证服务不会中断或无错误。"
      },
      {
        title: "7. 责任限制",
        content: "在适用法律允许的最大范围内，我们不对任何间接、附带、特殊或后果性损害承担责任。"
      },
      {
        title: "8. 条款修改",
        content: "我们保留随时修改本条款的权利。修改后的条款将在发布后立即生效。继续使用服务即表示您接受修改后的条款。"
      },
      {
        title: "9. 终止服务",
        content: "我们可能因任何原因暂停或终止您对服务的访问，包括违反本条款。终止后，您使用服务的权利将立即停止。"
      },
      {
        title: "10. 适用法律",
        content: "本条款受中华人民共和国法律管辖。与本条款相关的任何争议应提交至有管辖权的法院解决。"
      }
    ]
  } : {
    title: "Terms of Service",
    lastUpdated: "Last Updated: January 1, 2024",
    sections: [
      {
        title: "1. Acceptance of Terms",
        content: "By accessing or using our services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services."
      },
      {
        title: "2. Account Registration",
        content: "You must provide accurate and complete registration information and keep it updated. You are responsible for maintaining the security of your account and all activities under it."
      },
      {
        title: "3. Service Usage",
        content: "You agree to use the service only for lawful purposes and not engage in any illegal or unauthorized activities. Automated tools to access or interfere with the service are prohibited."
      },
      {
        title: "4. User Content",
        content: "You retain all rights to content you post through the service, but grant us a license to use and display it. You may not post illegal, harmful, or infringing content."
      },
      {
        title: "5. Intellectual Property",
        content: "The service and all its content, features, and design are our proprietary property, protected by copyright, trademark, and other intellectual property laws."
      },
      {
        title: "6. Disclaimer",
        content: "The service is provided \"as is\" without any warranties, express or implied. We do not guarantee that the service will be uninterrupted or error-free."
      },
      {
        title: "7. Limitation of Liability",
        content: "To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, or consequential damages."
      },
      {
        title: "8. Modification of Terms",
        content: "We reserve the right to modify these terms at any time. Modified terms will be effective immediately upon posting. Continued use of the service constitutes acceptance of modified terms."
      },
      {
        title: "9. Service Termination",
        content: "We may suspend or terminate your access to the service for any reason, including violation of these terms. Upon termination, your right to use the service will cease immediately."
      },
      {
        title: "10. Governing Law",
        content: "These terms are governed by the laws of the applicable jurisdiction. Any disputes related to these terms shall be submitted to the competent courts for resolution."
      }
    ]
  }

  return (
    <div className="flex flex-col min-h-[700px] px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <BackButton onClick={onBack} />
        <StaticLogo size="sm" className="text-foreground" />
      </div>

      {/* Title */}
      <h1 className="font-serif text-3xl font-bold text-foreground tracking-tight mb-2">
        {content.title}
      </h1>
      <p className="text-sm text-muted-foreground mb-6">{content.lastUpdated}</p>

      {/* Content */}
      <div className="flex-1 overflow-y-auto space-y-6 pb-6">
        {content.sections.map((section, index) => (
          <div key={index}>
            <h2 className="text-lg font-semibold text-foreground mb-2">{section.title}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{section.content}</p>
          </div>
        ))}
      </div>

      {/* Back Button */}
      <Button 
        onClick={onBack}
        variant="outline"
        className="w-full h-14 rounded-xl text-base font-medium border-border bg-transparent mt-4"
      >
        {language === "zh" ? "返回" : "Back"}
      </Button>
    </div>
  )
}
