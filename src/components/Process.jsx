import "./Process.css";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Process = () => {
    const sectionRef = useRef(null);
    const pathRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const path = pathRef.current;


            

            // Title animation
            gsap.from(".process-title", {
                y: 60,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                },
            });

            // Cards animation
            gsap.from(".process-card", {
                scale: 0.8,
                opacity: 0,
                stagger: 0.3,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="process" ref={sectionRef}>
            <div className="process-left">
                <span className="badge">My Process</span>

                <h1 className="process-title">
                    Here's how I
                    <br />
                    turn ideas into
                    <br />
                    real-world
                    <br />
                    applications
                </h1>

                <p>
                    I follow a structured, creative, and highly
                    technical approach to turn ideas into robust
                    full-stack applications.
                </p>
            </div>

            <div className="process-right">
                <svg
                    className="process-path"
                    viewBox="0 0 600 900"
                >
                    <path
                        ref={pathRef}
                        id="curve"
                        d="
                            M450 50
                            C560 120 520 190 420 250
                            S180 340 190 420
                            S480 540 420 640
                            S180 760 200 860
                        "
                    />
                </svg>

                <div className="process-card research">
                    <span>01</span>
                    <h3>Research</h3>
                    <p>
                        I start by understanding goals,
                        requirements and technical challenges
                        to build a solid foundation.
                    </p>
                </div>

                <div className="process-card design">
                    <span>02</span>
                    <h3>Design</h3>
                    <p>
                        Creating clean interfaces,
                        intuitive experiences and scalable
                        user journeys.
                    </p>
                </div>

                <div className="process-card build">
                    <span>03</span>
                    <h3>Development</h3>
                    <p>
                        Developing fast, reliable and
                        maintainable applications.
                    </p>
                </div>

                <div className="process-card deploy">
                    <span>04</span>
                    <h3>Deploy</h3>
                    <p>
                        Developing fast, reliable and
                        maintainable applications.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Process;