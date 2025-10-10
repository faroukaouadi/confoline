"use client";

import { useState } from "react";
import Link from "next/link";

type TabKey = "customer" | "docs" | "best" | "success" | "plateform";

const tabs: { key: TabKey; label: string }[] = [
    { key: "customer", label: "Customer Support" },
    { key: "docs", label: "Documentation" },
    { key: "best", label: "Best Practices" },
    { key: "success", label: "Customer Success" },
    { key: "plateform", label: "plateform Releases" },
];

export default function SupportPage() {
    const [active, setActive] = useState<TabKey>("customer");

    return (
        <main className="bg-gradient-to-br from-blue-950 to-blue-900 text-white min-h-screen">
            {/* Header section */}
            <section className="max-w-7xl 2xl:max-w-[90%] mx-auto px-4 pt-8 2xl:pt-12">
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-2xl sm:text-4xl 2xl:text-5xl font-extrabold">Support</h1>
                    </div>
                    <div className="hidden sm:block">
                        <Link
                            href="#learn-more"
                            className="inline-block rounded-full bg-blue-400 px-4 py-2 text-sm 2xl:text-xl font-medium text-white hover:bg-blue-300"
                        >
                            Read More
                        </Link>
                    </div>
                </div>

                {/* Top subtle divider */}
                <div className="mt-4 h-px w-full bg-white/20"></div>
            </section>

            {/* Content section */}
            <section className="max-w-7xl 2xl:max-w-[90%] mx-auto px-4 pb-12 2xl:pb-16">
                <div className="grid grid-cols-12 gap-6 pt-6">
                    {/* Left tabs */}
                    <aside className="col-span-12 md:col-span-3">
                        <nav className="space-y-2 text-sm 2xl:text-2xl">
                            {tabs.map((t) => {
                                const isActive = active === t.key;
                                return (
                                    <button
                                        key={t.key}
                                        onClick={() => setActive(t.key)}
                                        className={`w-full text-left px-3 py-2 rounded-md transition-colors ${isActive
                                                ? "bg-white/10 text-white"
                                                : "text-blue-100 hover:bg-white/5 hover:text-white"
                                            }`}
                                    >
                                        {t.label}
                                    </button>
                                );
                            })}
                        </nav>
                    </aside>

                    {/* Vertical divider */}
                    <div className="hidden md:block md:col-span-1">
                        <div className="mx-auto h-full w-px bg-white/20" />
                    </div>

                    {/* Right panel */}
                    <section className="col-span-12 md:col-span-8">
                        {active === "customer" && (
                            <div>
                                <h2 className="text-xl sm:text-2xl 2xl:text-4xl font-bold">Add a heading</h2>
                                <p className="mt-1 text-blue-200 text-sm 2xl:text-lg">Add a little bit of body text</p>
                                <div className="mt-3 h-0.5 w-48 bg-white/20" />

                                <div className="mt-6 grid sm:grid-cols-2 gap-8">
                                    <div>
                                        <h3 className="font-semibold 2xl:text-xl">Add a subheading</h3>
                                        <p className="mt-2 text-xs sm:text-sm 2xl:text-lg text-blue-200 leading-relaxed">
                                            Add a little bit of body text
                                            <br />
                                            Add a little bit of body text
                                            <br />
                                            Add a little bit of body text
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold 2xl:text-xl">Add a subheading</h3>
                                        <p className="mt-2 text-xs sm:text-sm 2xl:text-lg text-blue-200 leading-relaxed">
                                            Add a little bit of body text
                                            <br />
                                            Add a little bit of body text
                                            <br />
                                            Add a little bit of body text
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {active === "docs" && (
                            <div>
                                <h2 className="text-xl sm:text-2xl 2xl:text-3xl font-bold">Documentation</h2>
                                <p className="mt-1 text-blue-200 text-sm 2xl:text-base">Guides, API references, and tutorials.</p>
                                <div className="mt-3 h-0.5 w-48 bg-white/20" />
                                <div className="mt-6 grid sm:grid-cols-2 gap-8">
                                    <div>
                                        <h3 className="font-semibold 2xl:text-xl">Getting started</h3>
                                        <p className="mt-2 text-xs sm:text-sm text-blue-200 leading-relaxed">
                                            Learn the basics to integrate quickly and safely.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold 2xl:text-xl">API reference</h3>
                                        <p className="mt-2 text-xs sm:text-sm text-blue-2 00 leading-relaxed">
                                            Endpoints, schemas, and common examples.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {active === "best" && (
                            <div>
                                <h2 className="text-xl sm:text-2xl 2xl:text-3xl font-bold">Best Practices</h2>
                                <p className="mt-1 text-blue-200 text-sm 2xl:text-base">Recommendations to build reliably and at scale.</p>
                                <div className="mt-3 h-0.5 w-48 bg-white/20" />
                                <div className="mt-6 grid sm:grid-cols-2 gap-8">
                                    <div>
                                        <h3 className="font-semibold 2xl:text-xl">Security</h3>
                                        <p className="mt-2 text-xs sm:text-sm text-blue-200 leading-relaxed">
                                            Key steps to keep your implementation secure.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold 2xl:text-xl">Performance</h3>
                                        <p className="mt-2 text-xs sm:text-sm text-blue-200 leading-relaxed">
                                            Patterns to reduce latency and improve reliability.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {active === "success" && (
                            <div>
                                <h2 className="text-xl sm:text-2xl 2xl:text-3xl font-bold">Add a heading</h2>
                                <p className="mt-1 text-blue-200 text-sm 2xl:text-base">Add a little bit of body text</p>
                                <div className="mt-3 h-0.5 w-48 bg-white/20" />

                                <div className="mt-6 grid sm:grid-cols-2 gap-8">
                                    <div>
                                        <h3 className="font-semibold 2xl:text-xl">Add a subheading</h3>
                                        <p className="mt-2 text-xs sm:text-sm text-blue-200 leading-relaxed">
                                            Add a little bit of body text
                                            <br />
                                            Add a little bit of body text
                                            <br />
                                            Add a little bit of body text
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold 2xl:text-xl">Add a subheading</h3>
                                        <p className="mt-2 text-xs sm:text-sm text-blue-200 leading-relaxed">
                                            Add a little bit of body text
                                            <br />
                                            Add a little bit of body text
                                            <br />
                                            Add a little bit of body text
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                        {active === "plateform" && (
                            <div>
                                <h2 className="text-xl sm:text-2xl 2xl:text-3xl font-bold">Add a heading</h2>
                                <p className="mt-1 text-blue-200 text-sm 2xl:text-base">Add a little bit of body text</p>
                                <div className="mt-3 h-0.5 w-48 bg-white/20" />

                                <div className="mt-6 grid sm:grid-cols-2 gap-8">
                                    <div>
                                        <h3 className="font-semibold 2xl:text-xl">Add a subheading</h3>
                                        <p className="mt-2 text-xs sm:text-sm text-blue-200 leading-relaxed">
                                            Add a little bit of body text
                                            <br />
                                            Add a little bit of body text
                                            <br />
                                            Add a little bit of body text
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold 2xl:text-xl">Add a subheading</h3>
                                        <p className="mt-2 text-xs sm:text-sm text-blue-200 leading-relaxed">
                                            Add a little bit of body text
                                            <br />
                                            Add a little bit of body text
                                            <br />
                                            Add a little bit of body text
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Bottom note */}
                        <div className="mt-10 text-center text-xs sm:text-sm 2xl:text-xl text-blue-200">
                            Watch today’s vision demo. Our Next generation of Presales Architect.{' '}
                            <Link href="#" className="underline hover:text-white">Watch.</Link>
                        </div>
                    </section>
                </div>
            </section>
        </main>
    );
}


