// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    fr: {
      translation: {
        profile: {
          firstName: "Prénom",
          secondName: "Nom de famille",
          rating: "Évaluation",
          specialty: "Spécialité",
          contactDetails: "Coordonnées",
          languages: "Langues parlées",
          basicInfo: "Informations de Base",
          skillsAndExperience: "Compétences et Expériences",
          description: "Description",
          takeAppointment: "Prendre rendez-vous",
          commentsAndRatings: "Commentaires et Évaluations",
          addComment: "Ajouter un commentaire...",
          addCommentBtn: "Ajouter",
          viewAllComments: "Voir tous les commentaires",
          viewLess: "Voir moins",
          geographicalMap: "Carte Géographique",
        },
        appointment: {
          title: "Prenez votre rendez-vous ici",
          form: {
            title: "Prendre un rendez-vous",
            firstName: "Prénom",
            lastName: "Nom",
            email: "Email",
            day: "Jour",
            selectDay: "Sélectionnez un jour",
            time: "Heure",
            selectTime: "Sélectionnez une heure",
            book: "Réserver",
          },
          table: {
            workHours: "Heures de travail pour l'avocat",
            tokenHours: "Horaires de jetons pour l'avocat",
            date: "Date",
            time: "Heure",
            motif: "Motif",
            clientName: "Nom du client",
          },
        },
        editProfile: {
          title: "Modifier le Profil de l'Avocat",
          form: {
            uploadPhoto: "Télécharger une Photo :",
            firstName: "Prénom :",
            lastName: "Nom :",
            speciality: "Spécialité :",
            description: "Description :",
            languages: "Langues :",
            phoneNumber: "Téléphone :",
            email: "Email :",
            address: "Adresse :",
            saveChanges: "Enregistrer les Changements",
          },
        },

        home: {
          sectionTitles: {
            home: "Accueil",
            services: "Services",
            about: "À propos",
            ourServices: "Nos Services",
            contact: "Contact",
          },
          cards: {
            bankruptcy: {
              title: "La faillite",
              description:
                "Surmontez les difficultés financières avec notre expertise en droit de la faillite, offrant des conseils éclairés et des solutions adaptées à votre situation.",
            },
            modifications: {
              title: "Modifications",
              description:
                "Effectuez des modifications en toute confiance avec notre assistance, garantissant des ajustements précis et conformes à vos besoins spécifiques.",
            },
            foreclosure: {
              title: "Forclusion",
              description:
                "Naviguez avec assurance à travers les complexités de la forclusion avec notre équipe d'experts juridiques, prête à vous guider vers des solutions éclairées.",
            },
          },
          aboutUs: {
            title: "Qui nous sommes",
            subtitle: "À propos de DZ-Mouhami",
            description:
              "DZ-Mouhami, votre partenaire juridique de confiance, est un site d'avocat dédié à fournir des services juridiques de qualité. Notre équipe d'avocats expérimentés s'engage à vous offrir des conseils spécialisés et une représentation solide. Que vous ayez des préoccupations familiales, des questions criminelles ou des défis financiers, nous sommes là pour vous accompagner à chaque étape. Explorez notre site pour découvrir nos domaines d'expertise et la manière dont nous pouvons vous aider à résoudre vos problèmes juridiques avec professionnalisme et efficacité.",
          },
          ourServices: {
            title: "Nos Services",
            cards: {
              freeAdvice: {
                title: "CONSEIL GRATUIT",
                description:
                  "Bénéficiez d'un conseil gratuit de qualité, notre engagement envers vous pour vous offrir l'assistance dont vous avez besoin sans frais initiaux.",
              },
              specialServices: {
                title: "SERVICES SPÉCIAUX",
                description:
                  "Explorez nos services spéciaux, une offre sur mesure pour des solutions uniques.",
              },
              strategyDiscussion: {
                title: "DISCUTER DE STRATÉGIE",
                description:
                  "Entamons la discussion sur votre stratégie, pour façonner ensemble la voie vers votre succès.",
              },
              civilLawyers: {
                title: "AVOCATS CIVILS",
                description:
                  "Nos avocats civils dédiés sont là pour vous guider à travers les complexités du droit civil, assurant une représentation experte pour protéger vos intérêts.",
              },
              mediation: {
                title: "LA MÉDIATION",
                description:
                  "Choisissez la médiation pour des solutions équitables et durables dans la résolution des conflits.",
              },
              familyDisputes: {
                title: "DIFFÉRENDS FAMILIAUX",
                description:
                  "Abordez vos différends familiaux avec sensibilité et expertise, notre équipe d'avocats vous accompagne pour des solutions adaptées à vos besoins.",
              },
              criminalCases: {
                title: "LES CRIMINELS",
                description:
                  "Affrontez les enjeux criminels avec notre équipe d'avocats dévoués, prêts à vous défendre avec détermination et compétence.",
              },
              bankruptcyService: {
                title: "LA FAILLITE",
                description:
                  "Surmontez les difficultés financières avec notre assistance experte en droit de la faillite.",
              },
            },
          },
          contactUs: {
            title: "Entrer en contact",
            subtitle: "Contactez-nous",
            namePlaceholder: "Votre Nom",
            emailPlaceholder: "Votre Email",
            messagePlaceholder: "Entrer votre message ici",
            sendMessageBtn: "Envoyer Message",
          },
        },
      },
    },
    ar: {
      translation: {
        profile: {
          firstName: "الاسم الأول",
          secondName: "اسم العائلة",
          rating: "التقييم",
          specialty: "التخصص",
          contactDetails: "تفاصيل الاتصال",
          languages: "اللغات المتحدث بها",
          basicInfo: "معلومات أساسية",
          skillsAndExperience: "المهارات والخبرات",
          description: "الوصف",
          takeAppointment: "تحديد موعد",
          commentsAndRatings: "التعليقات والتقييمات",
          addComment: "إضافة تعليق...",
          addCommentBtn: "إضافة",
          viewAllComments: "عرض جميع التعليقات",
          viewLess: "عرض أقل",
          geographicalMap: "الخريطة الجغرافية",
        },
        appointment: {
          title: "تحديد موعد",
          form: {
            title: "تحديد موعد",
            firstName: "الاسم الأول",
            lastName: "اسم العائلة",
            email: "البريد الإلكتروني",
            day: "اليوم",
            selectDay: "اختر يوم",
            time: "الوقت",
            selectTime: "اختر الوقت",
            book: "حجز",
          },
          table: {
            workHours: "ساعات العمل للمحامي",
            tokenHours: "ساعات الرموز للمحامي",
            date: "تاريخ",
            time: "وقت",
            clientName: "اسم الزبون",
            motif: "نمط",
          },
        },
        editProfile: {
          title: "تعديل ملف المحامي",
          form: {
            uploadPhoto: "تحميل صورة :",
            firstName: "الاسم الأول :",
            lastName: "اسم العائلة :",
            speciality: "التخصص :",
            description: "الوصف :",
            languages: "اللغات :",
            phoneNumber: "رقم الهاتف :",
            email: "البريد الإلكتروني :",
            address: "العنوان :",
            saveChanges: "حفظ التغييرات",
          },
        },
        home: {
          services: {
            bankruptcy: {
              title: "الإفلاس",
              description:
                "تغلب على الصعوبات المالية مع خبرتنا في قانون الإفلاس، نقدم توجيهات مستنيرة وحلولا متكاملة لوضعك.",
            },
            modifications: {
              title: "التعديلات",
              description:
                "قم بإجراء التعديلات بثقة مع مساعدتنا، مما يضمن تعديلات دقيقة ومتوافقة مع احتياجاتك الخاصة.",
            },
            foreclosure: {
              title: "المصادرة",
              description:
                "توجه بثقة خلال تعقيدات المصادرة مع فريق خبراء قانون العقارات لدينا، جاهز لتوجيهك نحو حلول مستنيرة.",
            },
          },
          about: {
            title: "من نحن",
            subtitle: "حول DZ-Mouhami",
            content:
              "DZ-Mouhami، شريكك القانوني الموثوق، هو موقع محام dedicé لتقديم خدمات قانونية ذات جودة. يلتزم فريقنا من المحامين ذوي الخبرة بتقديم استشارات متخصصة وتمثيل قوي. سواء كنت تواجه قضايا أسرية أو تساؤلات جنائية أو تحديات مالية، نحن هنا لمساعدتك في كل خطوة. استكشف موقعنا لاكتشاف مجالات الخبرة لدينا وكيف يمكننا مساعدتك في حل مشاكلك القانونية بكفاءة واحتراف.",
          },
          ourServices: {
            title: "خدماتنا",
            freeConsultation: {
              title: "استشارة مجانية",
              description:
                "استفد من استشارة مجانية ذات جودة، التزامنا بتقديم الدعم الذي تحتاجه دون تكاليف أولية.",
            },
            specialServices: {
              title: "خدمات خاصة",
              description: "استكشف خدماتنا الخاصة، عرض مخصص لحلول فريدة.",
            },
            strategyDiscussion: {
              title: "مناقشة الاستراتيجية",
              description:
                "لنبدأ في مناقشة استراتيجيتك، لنشكل معًا الطريق نحو نجاحك.",
            },
            civilLawyers: {
              title: "محامون مدنيون",
              description:
                "محامونا المدنيون المختصون هم هنا ليتيحوا لك التوجيه خلال تعقيدات القانون المدني، مضمونين تقديم تمثيل خبير لحماية مصالحك.",
            },
            mediation: {
              title: "الوساطة",
              description: "اختر الوساطة لحلول عادلة ودائمة في حل النزاعات.",
            },
            familyDisputes: {
              title: "نزاعات الأسرة",
              description:
                "تناول نزاعات الأسرة بحساسية وخبرة، يرافقك فريقنا من المحامين للعثور على حلول مناسبة لاحتياجاتك.",
            },
            criminalCases: {
              title: "القضايا الجنائية",
              description:
                "تواجه التحديات الجنائية مع فريقنا المخلص من المحامين، الذين يستعدون للدفاع عنك بتصميم وكفاءة.",
            },
            bankruptcy: {
              title: "الإفلاس",
              description:
                "تغلب على الصعوبات المالية مع مساعدتنا الخبيرة في قانون الإفلاس.",
            },
          },
          contact: {
            title: "التواصل",
            subtitle: "اتصل بنا",
            nameLabel: "اسمك",
            emailLabel: "بريدك الإلكتروني",
            messageLabel: "أدخل رسالتك هنا",
            sendButton: "إرسال الرسالة",
          },
        },
      },
    },
  },
  lng: "fr", // default language
  fallbackLng: "fr", // fallback language
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
