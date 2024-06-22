import React from "react";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import "./profile.css";
import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Link, useParams } from "react-router-dom";
import avatar from "./pic/avatar.png";
import StarRating from "./StarRating";

const Profile = () => {
  const userId = localStorage.getItem("userId");
  //const userId = null;
  console.log(userId);
  const { t } = useTranslation();

  const [showAuthError, setShowAuthError] = useState(false);
  const [errorAddingComment, setErrorAddingComment] = useState("");
  const [errorAddingRating, setErrorAddingRating] = useState("");
  const [errorAddingAvg, setErrorAddingAvg] = useState("");
  let [commentaires, setCommentaires] = useState([]);
  const [showAllComments, setShowAllComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  let [lawyer, setLawyer] = useState({});
  const [rating, setRating] = useState();
  const [ratingAvg, setRatingAvg] = useState();

  const changeLanguage = (lng) => {
    console.log("Changing language to:", lng);
    i18n.changeLanguage(lng);
  };
  let { idlawyer } = useParams();

  useEffect(() => {
    getLawyer();
  }, [idlawyer]);

  let getLawyer = async () => {
    let response = await fetch(
      `http://127.0.0.1:8000/api/Lawyers/${idlawyer}/`
    );
    let data = await response.json();
    setLawyer(data);
  };

  useEffect(() => {
    getCommentaires();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await getRatingAvg();
      console.log("Rating Average:", ratingAvg);
    };
    fetchData();
  }, []);

  const displayedComments = showAllComments
    ? commentaires
    : commentaires.slice(0, 3);
  const handleAddComment = async () => {
    if (newComment.trim() !== "") {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/add-commentaire/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: userId,
              lawyer_id: idlawyer,
              body: newComment,
            }),
          }
        );

        if (response.ok) {
          getCommentaires();
          setNewComment("");
          console.log("Commentaire ajouté avec succès !");
        } else {
          const errorData = await response.json();
          setErrorAddingComment(
            errorData.error || "Erreur lors de l'ajout du commentaire"
          );
        }
      } catch (error) {
        console.error("Erreur lors de la requête POST :", error);
      }
    }
  };

  let getCommentaires = async () => {
    let response = await fetch(
      `http://127.0.0.1:8000/api/get-comments-by-lawyer/${idlawyer}/`
    );
    let data = await response.json();
    console.log("DATA", data);
    setCommentaires(data);
  };

  const handleRatingChange = async (newRating) => {
    try {
      if (!userId) {
        console.log("User is not authenticated. Please log in.");
        return;
      }

      const response = await fetch(`http://127.0.0.1:8000/api/add-rating/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          lawyer_id: idlawyer,
          rating: newRating,
        }),
      });

      if (response.ok) {
        // Check if the user has already rated this lawyer
        const existingRatingIndex = rating.findIndex(
          (ratingItem) =>
            ratingItem.client_id === parseInt(userId) &&
            ratingItem.lawyer_id === parseInt(idlawyer)
        );

        if (existingRatingIndex !== -1) {
          // Update the existing rating in the state
          setRating((prevRating) => {
            const updatedRating = [...prevRating];
            updatedRating[existingRatingIndex].rating = newRating;
            return updatedRating;
          });
        } else {
          // Add a new rating to the state
          setRating((prevRating) => [
            ...prevRating,
            {
              client_id: parseInt(userId),
              lawyer_id: parseInt(idlawyer),
              rating: newRating,
            },
          ]);
        }

        // Fetch the average rating after updating
        await getRatingAvg();
        console.log("Évaluation ajoutée avec succès !");
      } else {
        const errorData = await response.json();
        setErrorAddingRating(
          errorData.error || "Erreur lors de l'ajout de l'évaluation"
        );
      }
    } catch (error) {
      console.error("Erreur lors de la requête POST :", error);
    }
  };

  const getRatingAvg = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/get-rating-by-lawyer/${idlawyer}/`
      );
      if (response.ok) {
        const data = await response.json();
        setRatingAvg(data.average_rating);
        console.log("Server response:", data);
      } else {
        setErrorAddingAvg("Erreur lors de la récupération de la note moyenne");
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de la note moyenne :",
        error
      );
    }
  };

  const handleTakeAppointment = () => {
    if (userId) {
      // Utilisateur connecté, rediriger vers la page rendezvous
      window.location.href = `/rendezvous/${idlawyer}`;
    } else {
      // Utilisateur non connecté, afficher le message d'erreur
      setShowAuthError(true);
    }
  };
  return (
    <div className="profile">
      <NavBar />

      <button onClick={() => changeLanguage("fr")} className="translate">
        French
      </button>
      <button onClick={() => changeLanguage("ar")} className="translate">
        العربية
      </button>

      <div className="profile-container">
        <div className="first">
          <div className="profile-header">
            <h1>
              {lawyer.firstName}
              {lawyer.secondName}
            </h1>
            <img
              src={
                lawyer.image ? `http://127.0.0.1:8000${lawyer.image}` : avatar
              }
              alt={`${lawyer.firstName} ${lawyer.secondName}`}
              className="profile-image"
            />
          </div>

          <section className="basic-info-section">
            <h2 className="section-title">{t("profile.basicInfo")}</h2>

            <p className="info-item">
              <strong>{t("profile.rating")} </strong>
              {typeof ratingAvg === "number" && (
                <StarRating readOnly initialRating={ratingAvg} />
              )}
            </p>

            <p className="info-item">
              <strong>{t("profile.contactDetails")} :</strong>{" "}
              {lawyer.phoneNumber} | {lawyer.email}
            </p>
            <p className="info-item">
              <strong>{t("profile.languages")} :</strong> {lawyer.langues}
            </p>
          </section>

          <section className="skills-experience-section">
            <h2 className="section-title">
              {t("profile.skillsAndExperience")}
            </h2>
            <ul className="skills-list">
              <p className="info-item">
                <strong>{t("profile.description")} :</strong>{" "}
                {lawyer.description}
              </p>
              <li className="skill-item">Médiation </li>
              <li className="skill-item">Droit des contrats</li>
              <li className="skill-item">Contentieux</li>
            </ul>

            <div className="experiences">
              <div className="experience-item">
                <h3 className="experience-title">
                  Associé principal chez XYZ Cabinet d'Avocats
                </h3>
                <p className="experience-description">
                  Gestion d'une variété d'affaires civiles et fourniture de
                  conseils juridiques...
                </p>
              </div>
            </div>
          </section>

          {/* <div className="appointment-section">
            <Link to={`/rendezvous/${idlawyer}`}>
              <button>{t("profile.takeAppointment")}</button>
            </Link>
          </div> */}

          <div className="appointment-section">
            <button onClick={handleTakeAppointment}>
              {t("profile.takeAppointment")}
            </button>
            {showAuthError && (
              <p className="error-message">
                Vous devez d'abord vous authentifier pour prendre un
                rendez-vous.
              </p>
            )}
          </div>
        </div>
        <div className="second">
          <section className="reviews-section">
            <div className="comments">
              <h2 className="section-title">
                {t("profile.commentsAndRatings")}
              </h2>
              <ul className="comment-list">
                {displayedComments.map((comment, index) => (
                  <li key={comment.id} className="comment-card">
                    <img
                      src={avatar}
                      alt={comment.clientName}
                      className="lawyer-avatar"
                    />
                    <div className="comment-content">
                      <h4>{comment.clientName}</h4>
                      <p>{comment.bodyComment}</p>
                    </div>
                  </li>
                ))}
              </ul>

              {commentaires.length > 3 && (
                <button
                  onClick={() => setShowAllComments(!showAllComments)}
                  className="center-button"
                >
                  {showAllComments
                    ? t("profile.viewLess")
                    : t("profile.viewAllComments")}
                </button>
              )}
            </div>

            <div className="add-comment-section">
              <input
                type="text"
                placeholder={t("profile.addComment")}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="comment-input"
              />
              <button onClick={handleAddComment} className="add-comment-btn">
                {t("profile.addCommentBtn")}
              </button>
              {errorAddingComment && (
                <p className="error-message">{errorAddingComment}</p>
              )}
            </div>
          </section>

          <section className="reviews-section">
            <h2 className="section-title">{t("Ajoutez votre notation")}</h2>
            {userId ? (
              rating ? (
                <>
                  <p>Your rating: {rating}</p>
                  <StarRating readOnly initialRating={rating} />
                </>
              ) : (
                <StarRating initialRating={0} onChange={handleRatingChange} />
              )
            ) : (
              <p>
                Vous devez s'authentifier pour pouvoir ajouter votre feedback.
              </p>
            )}
          </section>

          <section className="map-section">
            <h2 className="section-title">{t("profile.geographicalMap")}</h2>
            <p className="address-info">{lawyer.adresse}</p>
            <div className="map-carte">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d102656.45963598845!2d2.717788105303067!3d36.48136915559906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128f0c66865a4cd1%3A0xccfcf9c073646dfe!2sBlida!5e0!3m2!1sfr!2sdz!4v1706502173694!5m2!1sfr!2sdz"
                width="600"
                height="450"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="map-iframe"
              ></iframe>
              {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d102272.51549283971!2d4.9245762739371415!3d36.77018100325001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12f2cca1a82082c5%3A0x7807b41e13330b6e!2zQsOpamHDr2E!5e0!3m2!1sfr!2sdz!4v1706494521457!5m2!1sfr!2sdz" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
