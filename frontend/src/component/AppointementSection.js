import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import NavBar from "./NavBar";
import Footer from "./Footer";
import "./rendezvous.css";
import { useParams } from "react-router-dom";

const AppointmentSection = () => {
  const userId = localStorage.getItem("userId");
  console.log(userId);

  const { t } = useTranslation();
  const changeLanguage = (lng) => {
    console.log("Changing language to:", lng);
    i18n.changeLanguage(lng);
  };
  const { idlawyer } = useParams();
  const [rendezvous, setRendezvous] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getRendezvous();
  }, [idlawyer]);

  const getRendezvous = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/get-rendezvous-by-lawyer/${idlawyer}/`
      );
      const data = await response.json();
      setRendezvous(data);
    } catch (error) {
      console.error("Error fetching rendezvous:", error);
    }
  };

  const lawyerTimeOfWork = [
    { day: "Dimanche", time: "09:00 - 17:00" },
    { day: "Lundi", time: "09:00 - 17:00" },
    { day: "Mardi", time: "10:00 - 18:00" },
    { day: "Mercredi", time: "08:00 - 16:00" },
    { day: "Jeudi", time: "08:00 - 16:00" },
    // Ajoutez plus d'entrées de temps de travail au besoin
  ];

  const availableSlots = [
    "1 janvier 2024 09:00:00",
    "1 janvier 2024 10:00:00",
    "2 janvier 2024 11:00:00",
    // Ajoutez plus de créneaux au besoin
  ];

  const [selectedSlot, setSelectedSlot] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [detail, setDetail] = useState("");

  const [clientName, setclientName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const handleSlotChange = (e) => {
    const selectedSlot = e.target.value;
    setSelectedSlot(e.target.value);
  };

  const handleclientNameChange = (e) => {
    setclientName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleDayChange = (e) => {
    const selectedDay = e.target.value;
    const selectedDate = new Date(selectedDay);

    // Vérifier si le jour sélectionné n'est pas vendredi (5) ni samedi (6)
    if (selectedDate.getDay() !== 5 && selectedDate.getDay() !== 4) {
      setSelectedDay(selectedDay);
      setDetail("");
    } else {
      setDetail("Vous ne pouvez pas sélectionner vendredi ou samedi.");
    }
  };
  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Créneau sélectionné : ${selectedSlot}`);
    setSubmitted(true);
  };

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/add-rendezvous/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId,
            lawyer_id: idlawyer,
            date: selectedDay,
            heure: selectedTime,
          }),
        }
      );

      if (response.ok) {
        // Rafraîchir la liste des rendez-vous après l'ajout
        getRendezvous();
        console.log("Rendez-vous ajouté avec succès !");
        // Réinitialiser les champs et le flag "submitted" après la soumission réussie
        setclientName("");
        setEmail("");
        setSelectedDay("");
        setSelectedTime("");
        setSubmitted(true);
        setError(""); // Réinitialiser l'erreur
      } else {
        const data = await response.json();
        console.error("Erreur lors de l'ajout du rendez-vous :", data.error);
        setError(data.error); // Mettre à jour l'erreur
      }
    } catch (error) {
      console.error("Erreur lors de la requête POST :", error);
      setError(
        "Une erreur s'est produite lors de la soumission du rendez-vous."
      );
    }
  };

  return (
    <section className="appointment-page">
      <NavBar />
      <button onClick={() => changeLanguage("fr")} className="translate">
        French
      </button>
      <button onClick={() => changeLanguage("ar")} className="translate">
        العربية
      </button>

      <h2 className="section-title-rdv">{t("appointment.title")}</h2>
      <div className="appointment-grid">
        <div className="appointment-table">
          <div className="table-container">
            <h3>{t("appointment.table.workHours")}</h3>
            <table>
              <thead>
                <tr>
                  <th>{t("appointment.table.date")}</th>
                  <th>{t("appointment.table.time")}</th>
                </tr>
              </thead>
              <tbody>
                {lawyerTimeOfWork.map((timeOfWork, index) => (
                  <tr key={index}>
                    <td>{timeOfWork.day}</td>
                    <td>{timeOfWork.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="table-container">
            <h3>{t("appointment.table.tokenHours")}</h3>
            <table>
              <thead>
                <tr>
                  <th>{t("appointment.table.date")}</th>
                  <th>{t("appointment.table.time")}</th>
                  <th>{t("appointment.table.clientName")}</th>
                  <th>{t("appointment.table.motif")}</th>
                </tr>
              </thead>
              <tbody>
                {rendezvous.map((token, index) => (
                  <tr key={index}>
                    <td>{token.dateRDV}</td>
                    <td>{token.heureRDV}</td>
                    <td>{token.clientName}</td>
                    <td>Consultation</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="form-container">
          <h3>{t("appointment.form.title")}</h3>
          <form onSubmit={handleAppointmentSubmit} className="appointment-form">
            {/* <label>{t("appointment.form.firstName")}:</label>
            <input
              type="text"
              value={clientName}
              onChange={handleclientNameChange}
              required
            /> */}

            {/* <label>{t("appointment.form.lastName")}:</label>
            <input
              type="text"
              value={lastName}
              onChange={handleLastNameChange}
              required
            /> */}
            {/* 
            <label>{t("appointment.form.email")}:</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
            /> */}

            {/* <label>{t("appointment.form.day")}:</label>
            <select value={selectedDay} onChange={handleDayChange} required>
              <option value="">{t("appointment.form.selectDay")}</option>
              <option value="Lundi">{t("days.monday")}</option>
              <option value="Mardi">{t("days.tuesday")}</option>
              <option value="Mercredi">{t("days.wednesday")}</option>
            </select>
          */}
            <label>{t("appointment.form.time")}:</label>
            <select value={selectedTime} onChange={handleTimeChange} required>
              <option value="">{t("appointment.form.selectTime")}</option>
              <option value="09:00:00">09:00:00</option>
              <option value="10:00:00">10:00:00</option>
              <option value="11:00:00">11:00:00</option>
              <option value="12:00:00">12:00:00</option>
              <option value="13:00:00">13:00:00</option>
              <option value="14:00:00">14:00:00</option>
              <option value="15:00:00">16:00:00</option>
            </select>

            <label>{t("appointment.form.day")}:</label>
            <input
              type="date"
              value={selectedDay}
              onChange={handleDayChange}
              required
            />
            <span>{detail}</span>
            {/* <label>{t("appointment.form.time")}:</label>
            <input
              type="time"
              value={selectedTime}
              onChange={handleTimeChange}
              required
            /> */}

            <button type="submit" className="submit-button">
              {t("appointment.form.book")}
            </button>
            {error && <div className="error-message">{error}</div>}
          </form>
        </div>
      </div>

      <Footer />
    </section>
  );
};

export default AppointmentSection;
