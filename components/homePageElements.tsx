"use client"
import { motion } from 'framer-motion';
import React from 'react';


const slideIn = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 }
};

export function Hero() {
    return (
        <div className="shrink-0 basis-full snap-start">
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                variants={slideIn}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="flex flex-col items-center text-center inline-block"
            >
                <motion.h1 className="text-4xl md:text-8xl drop-shadow-md" variants={slideIn} transition={{ duration: 0.8 }}>Hi, I&apos;m James.</motion.h1>
                <motion.h2 variants={slideIn} transition={{ duration: 0.9 }}>Fullstack Developer & AI Explorer.</motion.h2>
                <motion.p variants={slideIn} transition={{ duration: 1.0 }} className="text-gray-400 max-w-xl">
                    I build fast, scalable web apps—from rich frontends to intelligent backends.
                </motion.p>
                <motion.a variants={slideIn} transition={{ duration: 1.1 }} href="projects"
                    className="mt-6 inline-block bg-accent text-white px-6 py-3 rounded hover:bg-accent_hover"
                >See My Work</motion.a>
            </motion.section>
        </div>
    );
}

export function Skills() {
    const skills = [
        "⚡ React, Next.js, TypeScript, Tailwind",
        "🧠 Python, FastAPI, MongoDB, PostgreSQL",
        "☁️ AWS, Docker, Vercel",
        "🤖 LLMs, AI Agents, LangGraph, RL"
    ];

    const list = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } }
    };
    const item = {
        hidden: { opacity: 0, x: 100 },
        visible: { opacity: 1, x: 0 }
    };


    return (
        <div className="shrink-0 basis-full snap-start">
            <section className="max-w-4xl mx-auto p-20 inline-block flex flex-col items-center text-center inline-block">
                <h2 className="text-3xl font-semibold mb-8">What I Do</h2>

                <motion.ul initial="hidden" whileInView="visible" variants={list} viewport={{ once: false }}>
                    {skills.map((skill, idx) => (
                        <motion.li key={idx} variants={item} transition={{ duration: 1.2 }} className="text-lg text-gray-300">
                            {skill}
                        </motion.li>
                    ))}
                </motion.ul>
            </section>
        </div>
    );
}

export function Experience() {
    const experiences = [
        {
            title: "Salesforce Technical Consultant",
            details: [
                "Built enterprise UIs using LWC, AWS, and REST APIs",
                "Led B2B commerce platforms for HID and Steelcase"
            ]
        },
        {
            title: "Fullstack Developer at Kent State",
            details: [
                "React + FastAPI + MongoDB",
                "Built control panels, dashboards, and integrations with Stripe, Cognito"
            ]
        }
    ];

    const experiences2 = [
        {
            title: "AI & ML Projects",
            details: [
                "Built LLM-powered agents and RL learners",
                "Experimented with PPO, DQN, and local model hosting"
            ]
        }
    ];

    return (
        <React.Fragment>
            <div className="shrink-0 basis-full snap-start px-30">
                <section className="bg-secondary py-5 inline-block flex flex-col items-center text-center inline-block">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-semibold mb-8">Where I&apos;ve Worked</h2>
                        <div>
                            {experiences.map((exp, idx) => (
                                <motion.div
                                    key={idx}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: false }}
                                    variants={slideIn}
                                    transition={{ duration: 1.2, delay: idx * 0.15 }}
                                >
                                    <h3 className="text-xl font-bold">{exp.title}</h3>
                                    {exp.details.map((d, i) => (
                                        <p key={i} className="text-gray-400">• {d}</p>
                                    ))}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
            <div className="shrink-0 basis-full snap-start px-30">
                <section className="bg-secondary py-5 inline-block flex flex-col items-center text-center inline-block">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-semibold mb-8">What I&apos;ve been doing lately</h2>
                        <div>
                            {experiences2.map((exp, idx) => (
                                <motion.div
                                    key={idx}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: false }}
                                    variants={slideIn}
                                    transition={{ duration: 1.2, delay: idx * 0.15 }}
                                >
                                    <h3 className="text-xl font-bold">{exp.title}</h3>
                                    {exp.details.map((d, i) => (
                                        <p key={i} className="text-gray-400">• {d}</p>
                                    ))}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </React.Fragment>
    );
}

export function Footer() {
    return (
        <div className="shrink-0 basis-full snap-start">
            <motion.footer
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 1.2 }}
                className="text-center py-20 px-4 inline-block flex flex-col items-center text-center inline-block"
            >
                <h2 className="text-2xl font-semibold mb-4">Let’s build something great together.</h2>
                <motion.a whileHover={{ scale: 1.05 }} href="mailto:you@example.com"
                    className="inline-block bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-500"
                >
                    Get in Touch
                </motion.a>
            </motion.footer>
        </div>
    );
}
