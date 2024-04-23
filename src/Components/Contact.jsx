import { useState, useRef } from "react";

import emailjs from "@emailjs/browser";
import EarthRender from "./EarthRender";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    ///template_yrlss19
    // service_7csj1em
    ///1TVurSpp00nkAoHhR
    emailjs
      .send(
        "service_guu9ib5",
        "template_zfop21k",
        {
          from_name: form.name,
          to_name: "Maahi",
          from_email: form.email,
          to_email: "palmaahi27@gmail.com",
          message: form.message,
        },
        "5BpJcb_erFST9t_56"
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible");
          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.log(error);
          alert("Something went wrong.");
        }
      );
  };

  return (
    <div className="bg-black h-screen xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
      
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="mt-28 ml-32 flex flex-col gap-8"
      >
        <label className="flex flex-col">
          <span className="text-white font-medium mb-4">Your Name</span>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            autoComplete="off"
            placeholder="What's your name?"
            className="bg-tertiary py-4 px-6 placeholder:text-secondary text-black rounded-lg outlined-none border-none font-medium"
          />
        </label>
        <label className="flex flex-col">
          <span className="text-white font-medium mb-4">Your Email</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="off"
            placeholder="What's your email?"
            className="bg-tertiary py-4 px-6 placeholder:text-secondary text-black rounded-lg outlined-none border-none font-medium"
          />
        </label>
        <label className="flex flex-col">
          <span className="text-white font-medium mb-4">Your Message</span>
          <textarea
            rows="5"
            name="message"
            value={form.message}
            onChange={handleChange}
            autoComplete="off"
            placeholder="What do you want to say?"
            className="bg-tertiary py-4 px-6 placeholder:text-secondary text-black rounded-lg outlined-none border-none font-medium"
          />
        </label>
        <button
          type="submit"
          className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl"
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
      <div className="w-full h-full ">
          <EarthRender/>
      </div>
    </div>
  );
};

export default Contact;
