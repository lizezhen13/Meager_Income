import { type FC, type ReactNode, useEffect, useState } from 'react';
import onboardingImage from '../documents/onboarding.png';
import styles from './Onboarding.module.css';

interface OnboardingProps {
  onEnterApp: () => void;
}

interface FeatureCardConfig {
  title: string;
  icon: ReactNode;
}

type FeatureCardProps = FeatureCardConfig;

const COPY = {
  wordmarkSubtitle: '实时工资可视化',
  headlineLeading: '每一分努力，都能被',
  headlineHighlight: '实时看见',
  description:
    '输入月薪以及每日工作时长即可开启实时收入可视化，自动按照每秒、每分钟、每小时、每日拆解收入速率与每日创收进度。摒弃繁琐报表，数据清晰直观，同时还有趣味成就等你来解锁，打工算账也有小乐趣。',
  cta: '进入应用',
};

const PixelMarkIcon = () => (
  <svg viewBox="0 0 40 40">
    <path
      className={styles.markFill}
      d="M12 8.5h16a3 3 0 0 1 3 3v20l-4.1-2.4-3.5 2.4-3.4-2.4-3.5 2.4-4.5-2.4V11.5a3 3 0 0 1 3-3Z"
    />
    <path d="M16 16.5h8" />
    <path d="M16 21.5h6" />
    <path d="M15.2 26.3c3.2 1.6 7.8 1.6 10.9 0" />
    <path
      className={styles.markSpark}
      d="M29.2 7.5l1.2 2.4 2.5 1.1-2.5 1.1-1.2 2.5-1.2-2.5-2.5-1.1 2.5-1.1 1.2-2.4Z"
    />
  </svg>
);

const SalaryIcon = () => (
  <svg viewBox="0 0 32 32" aria-hidden="true">
    <path
      className={styles.iconFill}
      d="M8 12.5c0-3.1 3.7-5.6 8.3-5.6s8.3 2.5 8.3 5.6v7c0 3.1-3.7 5.6-8.3 5.6S8 22.6 8 19.5v-7Z"
    />
    <path className={styles.iconAccent} d="M21.8 8.2l1 2 2.1.9-2.1.9-1 2.1-1-2.1-2.1-.9 2.1-.9 1-2Z" />
    <path d="M8 12.4c0 3.1 3.7 5.6 8.3 5.6s8.3-2.5 8.3-5.6" />
    <path d="M8 17c0 3.1 3.7 5.6 8.3 5.6s8.3-2.5 8.3-5.6" />
    <path d="M13.1 11.5h6.4" />
    <path d="M16.3 9.4v4.1" />
  </svg>
);

const ProgressIcon = () => (
  <svg viewBox="0 0 32 32" aria-hidden="true">
    <path className={styles.iconSky} d="M8.2 17.4a7.8 7.8 0 0 1 15.6 0v3.2H8.2v-3.2Z" />
    <path className={styles.iconAccent} d="M16 10.2a7.2 7.2 0 0 1 7.2 7.2h-7.2v-7.2Z" />
    <path d="M7.2 20.6a8.8 8.8 0 1 1 17.6 0" />
    <path d="M16 20.5l5.1-6.8" />
    <path d="M7 23.5h18" />
    <path d="M10.5 26.4h11" />
  </svg>
);

const AchievementIcon = () => (
  <svg viewBox="0 0 32 32" aria-hidden="true">
    <path
      className={styles.iconFill}
      d="M10.7 8.2h10.6a2.9 2.9 0 0 1 2.9 2.9v3.5c0 4.7-3.4 8.8-8.2 10.2-4.8-1.4-8.2-5.5-8.2-10.2v-3.5a2.9 2.9 0 0 1 2.9-2.9Z"
    />
    <path
      className={styles.iconAccent}
      d="M16 11.5l1.5 3 3.3.5-2.4 2.3.6 3.3-3-1.6-3 1.6.6-3.3-2.4-2.3 3.3-.5 1.5-3Z"
    />
    <path d="M10.7 8.2h10.6a2.9 2.9 0 0 1 2.9 2.9v3.5c0 4.7-3.4 8.8-8.2 10.2-4.8-1.4-8.2-5.5-8.2-10.2v-3.5a2.9 2.9 0 0 1 2.9-2.9Z" />
    <path d="M12 25.7h8" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h12" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);

const FEATURE_CARDS: FeatureCardConfig[] = [
  { title: '实时工资', icon: <SalaryIcon /> },
  { title: '今日进度', icon: <ProgressIcon /> },
  { title: '成就到账', icon: <AchievementIcon /> },
];

const FeatureCard = ({ icon, title }: FeatureCardProps) => (
  <article className={styles.featureCard}>
    <span className={styles.cardIcon}>{icon}</span>
    <div>
      <h3>{title}</h3>
    </div>
  </article>
);

const Logo = () => (
  <div className={styles.logo}>
    <span className={styles.pixelMark} aria-hidden="true">
      <PixelMarkIcon />
    </span>
    <span className={styles.wordmark}>
      <strong>Meager Income</strong>
      <span>{COPY.wordmarkSubtitle}</span>
    </span>
  </div>
);

const Onboarding: FC<OnboardingProps> = ({ onEnterApp }) => {
  const [isReady, setIsReady] = useState(false);
  const pageClassName = isReady ? `${styles.page} ${styles.ready}` : styles.page;

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setIsReady(true);
    });

    return () => {
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <main className={pageClassName}>
      <span className={styles.shineLayer} aria-hidden="true" />

      <nav className={styles.nav} aria-label="页面导航">
        <Logo />
      </nav>

      <section className={styles.hero} aria-labelledby="onboarding-title">
        <div className={styles.copy}>
          <div className={styles.headlineLockup}>
            <h1 id="onboarding-title" className={styles.headlineTitle}>
              {COPY.headlineLeading}
              <span>{COPY.headlineHighlight}</span>
            </h1>
            <p className={styles.subcopy}>{COPY.description}</p>

            <section className={styles.bottomCards} aria-label="功能摘要">
              {FEATURE_CARDS.map((feature) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </section>

            <div className={styles.actions}>
              <button className={styles.button3d} type="button" onClick={onEnterApp}>
                <span className={styles.buttonLabel}>{COPY.cta}</span>
                <ArrowRightIcon />
              </button>
            </div>
          </div>
        </div>

        <div className={styles.showcase} aria-label="装饰背景区">
          <div className={styles.animationStage}>
            <img src={onboardingImage} alt="" className={styles.stageImg} aria-hidden="true" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Onboarding;
