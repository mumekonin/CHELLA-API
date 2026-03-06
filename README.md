# 🎉 CHELLA-API — Reward App Backend

A reward-based application backend built with **NestJS** and **MongoDB**. Users can register, earn referral rewards, complete daily tasks, and manage multi-currency transactions.

---

## ✨ Features

**👤 User Management**
- Register and login with username and password
- Automatic signup bonus of 100 ETB 💰
- Unique referral code generation and tracking 🔑

**🤝 Referral System**
- Refer others using a unique referral code
- Rewards automatically credited to both referrer and referee 🎁

**📋 Task Management**
- Daily tasks automatically generated using a **Cron Job** ✅
- Task completion updates user balance 💵

**💳 Transactions & Multi-Currency**
- Transfer money between users 💸
- Supports ETB, USD, and EUR with live rates from **Exchange Rate API** 🌍
- Transaction history with min/max transfer validation 📊

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| NestJS | Backend framework |
| MongoDB | Database |
| JWT | Authentication & Authorization |
| Cron Job | Automated daily task creation |
| Exchange Rate API | Real-time currency conversion |
| REST API | Communication layer |
| Git & GitHub | Version control |

---

## 🚀 Setup & Running

```bash
# Install dependencies
npm install

# Development
npm run start:dev

# Production
npm run start:prod
```

