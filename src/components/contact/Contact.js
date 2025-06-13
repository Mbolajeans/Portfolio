import { motion } from "framer-motion";
import React, { useRef, useState } from 'react';
import "./contact.scss"
import emailjs from '@emailjs/browser';

export default function Contact() {
     const form = useRef();
     const formRef = useRef();
     const [error, setError] = useState(false);
     const [succes, setSucces] = useState(false);

    const sendEmail = (e) => {
    e.preventDefault();

    setError(false);
    setSucces(false);

    emailjs
        .sendForm('service_w0ja6at', 'template_nj3anxh', form.current, {
        publicKey: 'kDsxoStfAHsTjaEBk',
        })
        .then(
        () => {
            setSucces(true);
            form.current.reset(); 
        },
        (error) => {
            setError(true);
        }
        );
    };

  return (
    <div className="contact">
        <motion.div className="textContainer" initial={{opacity:0, y:300 }} 
        whileInView={{opacity:1, y:0}} 
        transition={{duration:.5}}>
            <h1>Discutons de <br/>votre projet</h1>
            <div>
                <h2>Mail</h2>
                <a href="mailto:mbolajeans@gmail.com" target="_blank">mbolajeans@gmail.com</a>
            </div>
            <div>
                <h2>Adresse</h2>
                <p>Antananarivo 101, Analamanga, Madagascar</p>
            </div>
            <div>
                <h2>Téléphone</h2>
                <a href="tel:+26138787592" target="_blank">+261 38 72 875 92</a>
            </div>
        </motion.div>
        <div className="formContainer">
            <form ref={form} onSubmit={sendEmail}>
                <input type="text" required placeholder="Nom" name="nom"></input>
                <input type="email" required placeholder="E-mail" name="email"></input>
                <textarea rows={8} placeholder="Message" name="message"></textarea>
                <button>Envoyer</button>
                {succes && <p className="success-message">Message envoyé avec succès !</p>}
                {error && <p className="error-message">Une erreur est survenue. Veuillez réessayer.</p>}
            </form>
        </div>
    </div>
  )
}
