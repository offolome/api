import React, { useState, useEffect } from "react";
import "./UserList.css";
import axios from "axios";

const UserList = () => {
  const [listOfUSer, setListOfUSer] = useState([]); // Etat pour gérer les données renvoyées
  const [err, setErr] = useState(null); // Etat pour gérer les erreurs
  const [loading, setLoading] = useState(true); // Etat pour gérer le chargement

  // Récupération de la liste des utilisateurs
  useEffect(() => {
    // Fonction promesse pour obtenir les données
    const fetchData = async () => {
      try{
        const response = await axios.get("https://api.freeapi.app/api/v1/public/randomusers?page=1&limit=10");
        const users = response.data.data.data // Assignation de la reponse du serveur de récupération de données
        setListOfUSer(users); // Met à jour les données
      }
      catch(err) {
        setErr(err.message); // Affiche le message d'erreur
      }
      finally {
        setLoading(false); // Fin du chargement
      }
    };

    fetchData(); // Appelle la fonction de récupération de données
    
  }, []); // Tableau de dépendances vide pour appeler l'API une seule fois au montage

  if(loading) return <p>chargement...</p> // Charge la page pour afficher les données
  if(err) return <p>Erreur: {err}</p> // Affiche un message d'erreur

  return (
    // Affiche les utilisateurs dans un tableau
    <div className="table-list">
      <h1>Comptes utilisateurs</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Genre</th>
            <th>Nom utilisateur</th>
            <th>Email</th>
            <th>N°Téléphone</th>
          </tr>
        </thead>
        <tbody>
          {listOfUSer && listOfUSer.map((list, index) => (
            <tr key={list.id}>
              <td>{index + 1}</td>
              <td>{list.name.last}</td>
              <td>{list.name.first}</td>
              <td>{list.gender}</td>
              <td>{list.login.username}</td>
              <td>{list.email}</td>
              <td>{list.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
