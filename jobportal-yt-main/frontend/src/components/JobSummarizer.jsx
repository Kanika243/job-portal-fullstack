import React, { useState } from 'react';
import axios from 'axios';
import { GEMINI_API_END_POINT } from "../utils/constant"; // e.g. http://localhost:3000/api/v1/gemini
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { toast } from 'sonner';

const JobSummarizer = () => {
    const [jobDescription, setJobDescription] = useState("");
    const [summary, setSummary] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSummarize = async () => {
        if (!jobDescription) {
            toast.error("Please paste a job description first.");
            return;
        }
        setLoading(true);
        setSummary("");
        try {
            const res = await axios.post(`${GEMINI_API_END_POINT}/summarize`, 
                { jobDescription }, // The data we are sending
                { withCredentials: true } // Important for protected routes
            );
            setSummary(res.data.summary);
        } catch (error) {
            console.error(error);
            toast.error("Failed to generate summary.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='p-4 border rounded-md'>
            <h2 className='font-bold text-lg'>AI Job Summarizer</h2>
            <p className='text-sm text-gray-500'>Paste a job description below to get a quick summary.</p>
            <Textarea
                className="my-2"
                placeholder="Paste the job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={10}
            />
            <Button onClick={handleSummarize} disabled={loading}>
                {loading ? "Generating..." : "Summarize"}
            </Button>

            {summary && (
                <div className='mt-4 p-3 bg-gray-100 rounded-md whitespace-pre-wrap'>
                    <h3 className='font-semibold'>Summary:</h3>
                    <p>{summary}</p>
                </div>
            )}
        </div>
    );
};

export default JobSummarizer;