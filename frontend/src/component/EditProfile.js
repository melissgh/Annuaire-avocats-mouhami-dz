// src/components/EditProfile.js
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import Footer from "./Footer";
import NavBar from "./NavBar";
import "./Editprofile.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const EditProfile = () => {
  let navigate = useNavigate(); // Use useNavigate to get navigation functionality
  const { t } = useTranslation();
  const changeLanguage = (lng) => {
    console.log("Changing language to:", lng);
    i18n.changeLanguage(lng);
  };

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const lawyerId = searchParams.get("id");

  let [lawyer, setLawyer] = useState({});

  useEffect(() => {
    getLawyer();
  }, [lawyerId]);

  let getLawyer = async () => {
    let response = await fetch(
      `http://127.0.0.1:8000/api/Lawyers/${lawyerId}/`
    );
    let data = await response.json();
    setLawyer(data);
  };

  let updateLawyer = async () => {
    const formData = new FormData();

    const imageInput = document.getElementById("image");
    if (imageInput.files.length > 0) {
      formData.append("image", imageInput.files[0]);
    }
    //formData.append("image", document.getElementById("image").files[0]);
    formData.append("firstName", lawyer.firstName);
    formData.append("secondName", lawyer.secondName);
    formData.append("specialite", lawyer.specialite);
    formData.append("description", lawyer.description);
    formData.append("langues", lawyer.langues);
    formData.append("phoneNumber", lawyer.phoneNumber);
    formData.append("email", lawyer.email);
    formData.append("adresse", lawyer.adresse);

    fetch(`http://127.0.0.1:8000/api/Lawyers/${lawyerId}/update/`, {
      method: "PUT",
      body: formData,
      // headers: {
      //   "Content-Type": "multipart/form-data",
      // },
    });
  };

  const availableLanguages = [
    "Français",
    "Anglais",
    "Español",
    "Deutsch",
    "Italiano",
    "Português",
  ];

  const handleSubmit = (e) => {
    updateLawyer();
    e.preventDefault();
    navigate(`/profil/${lawyer.id}`);
    //window.location.reload();
    console.log("Lawyer profile updated:", lawyer);
  };

  return (
    <div className="edit-lawyer-profile">
      <NavBar />
      <button onClick={() => changeLanguage("fr")} className="translate">
        French
      </button>
      <button onClick={() => changeLanguage("ar")} className="translate">
        العربية
      </button>
      <div className="editing-section">
        <h2>{t("editProfile.title")}</h2>
        <form className="profile-form" encType="multipart/form-data">
          <div className="form-group-img">
            <label htmlFor="image">{t("editProfile.form.uploadPhoto")}</label>
            <input type="file" id="image" name="image" accept="image/*" />
          </div>

          <div className="form-group">
            <label htmlFor="firstName">{t("editProfile.form.firstName")}</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={lawyer.firstName}
              onChange={(e) => {
                setLawyer({ ...lawyer, firstName: e.target.value });
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="secondName">{t("editProfile.form.lastName")}</label>
            <input
              type="text"
              id="secondName"
              name="secondName"
              value={lawyer.secondName}
              onChange={(e) => {
                setLawyer({ ...lawyer, secondName: e.target.value });
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="specialite">
              {t("editProfile.form.speciality")}
            </label>
            <input
              type="text"
              id="specialite"
              name="specialite"
              value={lawyer.specialite}
              onChange={(e) => {
                setLawyer({ ...lawyer, specialite: e.target.value });
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">
              {t("editProfile.form.description")}
            </label>
            <textarea
              id="description"
              name="description"
              value={lawyer.description}
              onChange={(e) => {
                setLawyer({ ...lawyer, description: e.target.value });
              }}
            ></textarea>
          </div>

          <div className="form-group-lang">
            <label htmlFor="langues">{t("editProfile.form.languages")}</label>
            <select
              id="langues"
              name="languages"
              multiple
              value={lawyer.langues}
              onChange={(e) => {
                setLawyer({ ...lawyer, langues: e.target.value });
              }}
            >
              {availableLanguages.map((lang, index) => (
                <option key={index} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">
              {t("editProfile.form.phoneNumber")}
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={lawyer.phoneNumber}
              onChange={(e) => {
                setLawyer({ ...lawyer, phoneNumber: e.target.value });
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">{t("editProfile.form.email")}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={lawyer.email}
              onChange={(e) => {
                setLawyer({ ...lawyer, email: e.target.value });
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="adresse">{t("editProfile.form.address")}</label>
            <textarea
              id="adresse"
              name="adresse"
              value={lawyer.adresse}
              onChange={(e) => {
                setLawyer({ ...lawyer, adresse: e.target.value });
              }}
            ></textarea>
          </div>
          <button type="submit" className="save-button" onClick={handleSubmit}>
            {t("editProfile.form.saveChanges")}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default EditProfile;
