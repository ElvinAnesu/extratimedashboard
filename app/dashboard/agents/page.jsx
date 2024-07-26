"use client";
import Header from "@/components/header";
import AgentsTable from "@/components/tables/agentstable";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Agents() {
    const router = useRouter();
    const [supervisors, setSupervisors] = useState([]);
    const [selectedSupervisor, setSelectedSupervisor] = useState("all");
    const [agents, setAgents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const getSupervisors = async () => {
        const res = await fetch("/api/users/filter", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                role: "supervisor"
            })
        });

        const data = await res.json();

        if (data.success) {
            setSupervisors(data.users);
        }
    };

    const getAgentsBySupervisor = async (supervisorId) => {
        const res = await fetch(`/api/agents/bySupervisor/${supervisorId}`);
        const data = await res.json();

        if (data.success) {
            setAgents(data.agents);
        }
    };

    const handleSupervisorChange = (event) => {
        const selected = event.target.value;
        setSelectedSupervisor(selected);
        if (selected !== "all") {
            getAgentsBySupervisor(selected);
        } else {
            // If "All" is selected, clear the agents list
            setAgents([]);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        getSupervisors();
    }, []);

    const filteredAgents = agents.filter(agent =>
        agent.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full h-full flex flex-col gap-4">
            <Header title="Agents" />
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-start gap-8">
                    <h1>Filters:</h1>
                    <div className="flex items-center gap-2">
                        <span>Sales:</span>
                        <select className="border border-gray-300 rounded-md px-2 py-1">
                            <option value="all">All</option>
                            <option value="cleared">Cleared</option>
                            <option value="pending">Pending</option>
                        </select>
                    </div>
                    <div className="w-full flex items-center gap-2">
                        <span>Supervisor:</span>
                        <select className="border border-gray-300 rounded-md px-2 py-1" onChange={handleSupervisorChange}>
                            <option value="all">All</option>
                            {supervisors.map((supervisor) => (
                                <option key={supervisor.id} value={supervisor.id}>
                                    {`${supervisor.firstname} ${supervisor.surname}`}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="text" placeholder="Search" className="border border-gray-300 rounded-md px-2 py-1" onChange={handleSearch} />
                        <button className="bg-blue-500 text-white rounded-md px-4 py-1">Search</button>
                    </div>
                </div>
                <AgentsTable agents={filteredAgents} />
            </div>
        </div>
    );
}