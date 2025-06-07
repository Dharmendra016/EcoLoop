# ♻️ Digitized Waste Management System

🏆 Winner - Waste Management Hackathon, Kathmandu  
🚀 Selected for 3-Month Incubation by CNIYEF Nepal  

An AI-powered, IoT-enabled waste management solution that automatically classifies and separates household waste, tracks user-wise waste production, and turns recyclables into earnings via vendor collaborations.

> ✨ Our Idea: **Transform waste into valuable resources and actionable data.**

---

## 🌟 Key Features

- 🧠 **YOLO-Based Real-Time Waste Detection**  
  A camera-equipped smart bin runs a YOLOv5 object detection model to classify and sort mixed waste instantly.

- 🤖 **IoT-Enabled Smart Bin (ESP32)**  
  The system uses ESP32 to physically separate waste into different compartments based on classification output.

- 📈 **User Waste Tracking & Insights**  
  Each user can monitor their daily waste generation and receive sustainability insights and impact summaries.

- 🏙️ **Municipality Dashboard**  
  Authorities access aggregated and individual waste data to optimize collection, plan routes, and identify recycling opportunities.

- 🔄 **Recyclable Marketplace & Earnings**  
  Vendors post demand for specific recyclable materials. Municipalities match supply with demand. A portion of recycling revenue is rewarded back to contributing households.


---

## 🏗️ Tech Stack

| Layer        | Tools/Tech |
|--------------|------------|
| ML Model     | YOLOv5 (Object Detection) |
| Microcontroller | ESP32 (Cam + Servo Control) |
| Frontend     | React.js, Tailwind CSS |
| Backend      | Node.js, Express.js |
| Database     | MongoDB |
| Deployment   | Render, GitHub |

---

## 🚀 How It Works

1. 🗑️ **User deposits mixed waste** into the upper chamber of the smart bin.
2. 🎥 **Camera scans waste** → YOLO model identifies waste types (plastic, metal, organic, etc.).
3. 🕹️ **ESP32 controls actuators** to sort waste into correct compartments.
4. 🧾 **Waste logs are linked** to the user via a unique identifier (e.g., RFID or QR).
5. 🗂️ **Data syncs to dashboard** for tracking, reward, and municipality use.
6. ♻️ **Recyclables matched with vendor demand** → Revenue generated → Users earn credits.

---

## 📊 Data Visibility

| Stakeholder   | Access to |
|---------------|-----------|
| **User**      | Personal waste history, category-wise breakdown, rewards |
| **Vendor**    | Material demand post, matched recyclables |
| **Municipality/Admin** | Aggregated and household-level waste insights, vendor coordination |

---

## 🤝 Team

- 👨‍💻 [Bipin Kumar Marasini][(https://github.com/Bipin-km)]
- 👩‍💻 [Dharmendra Singh Chaudhary] [(https://github.com/Dharmendra016)]
- 👨‍🔧 [Nitesh Kumar Sah] [(https://github.com/nitesh-0)]
- 🧑‍💼 [Ramesh Kathayat]  [(https://github.com/ramesh34-hub)]

---

## 🙏 Acknowledgements

- Khalisisi, Ncell Foundation, Budhanilkantha Municipality, all other involving members, mentors, and fellow teams 
- CNIYEF Nepal for incubation support  
- Open-source contributors behind YOLO, ESP32 firmware, MongoDB, and more

---
