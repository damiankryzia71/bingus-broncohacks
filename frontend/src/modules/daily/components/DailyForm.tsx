import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

import { WellnessInputs } from "@/interfaces/WellnessInputs";
import { WellnessNotes } from "@/interfaces/WellnessNotes";
import { Days } from "@/interfaces/Days";

import { postWellnessInputs } from "@/api/wellness_inputs_api";
import { postWellnessNotes } from "@/api/wellness_notes_api";

import SvgSaddest from '@/svgs/1.svg?react';
import SvgSad from '@/svgs/2.svg?react';
import SvgNeutral from '@/svgs/3.svg?react'
import SvgHappy from '@/svgs/4.svg?react';
import SvgHappiest from '@/svgs/5.svg?react'

import { Users } from "@/interfaces/Users";
import { Recommendations } from "@/interfaces/Recommendations";
import { postRecommendationArray } from "@/api/recommendations_api";
import { WellnessScores } from "@/interfaces/WellnessScores";
import { DailyQuotes } from "@/interfaces/DailyQuotes";
import { postDailyQuote } from "@/api/daily_quote_api";
import { postWellnessScores } from "@/api/wellness_scores_api";



const svgs = [SvgSaddest, SvgSad, SvgNeutral, SvgHappy, SvgHappiest];

const formSchema = z.object({
    mood: z.enum(["1", "2", "3", "4", "5"]), // ['angry', 'anxious', 'sad', 'neutral', 'happy']
    energy: z.enum(["1", "2", "3", "4", "5"]), // ['exhausted', 'tired', 'normal', 'alert', 'energized']
    socialBattery: z.enum(["1", "2", "3", "4", "5"]), // ['drained', 'low', 'okay', 'charged', 'full']
    apetite: z.enum(["1", "2", "3", "4", "5"]), // ['no_appetite', 'not_hungry', 'normal', 'hungry', 'very_hungry']
    note: z.string()
});

const moodOptions = [
    { label: "Angry", value: "1" },
    { label: "Anxious", value: "2" },
    { label: "Sad", value: "3" },
    { label: "Neutral", value: "4" },
    { label: "Happy", value: "5" },
];

const energyOptions = [
    { label: "Exhausted", value: "1" },
    { label: "Tired", value: "2" },
    { label: "Normal", value: "3" },
    { label: "Alert", value: "4" },
    { label: "Energized", value: "5" },
];

const socialBatteryOptions = [
    { label: "Drained", value: "1" },
    { label: "Low", value: "2" },
    { label: "Okay", value: "3" },
    { label: "Charged", value: "4" },
    { label: "Full", value: "5" },
];

const apetiteOptions = [
    { label: "No Appetite", value: "1" },
    { label: "Not Hungry", value: "2" },
    { label: "Normal", value: "3" },
    { label: "Hungry", value: "4" },
    { label: "Very Hungry", value: "5" },
];

const svgColors = {
    base: "#FAFAFA",
    hover: "#C8BFE7",
    select: "#A7C7E7"
};

export default function DailyForm({ user, day, onSuccess }: { user: Users, day: Days, onSuccess: (resultInputs: WellnessInputs[], resultNote: WellnessNotes, resultRecommendations: Recommendations[], resultQuote: DailyQuotes, resultScore: WellnessScores) => void }) {
    const [submitting, setSubmitting] = useState<boolean>(false);

    const [selectedSvg, setSelectedSvg] = useState({
        mood: 2,
        energy: 2,
        socialBattery: 2,
        apetite: 2
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            mood: "3",
            energy: "3",
            socialBattery: "3",
            apetite: "3",
            note: ""
        }
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const mood: WellnessInputs = {
            user: user.id || 0,
            day: day.id || 0,
            category: 1,
            score: Number(values.mood)
        };
        const energy: WellnessInputs = {
            user: user.id || 0,
            day: day.id || 0,
            category: 2,
            score: Number(values.energy)
        };
        const socialBattery: WellnessInputs = {
            user: user.id || 0,
            day: day.id || 0,
            category: 3,
            score: Number(values.socialBattery)
        };
        const apetite: WellnessInputs = {
            user: user.id || 0,
            day: day.id || 0,
            category: 4,
            score: Number(values.apetite)
        };

        const note: WellnessNotes = {
            user: user.id || 0,
            day: day.id || 0,
            note: values.note
        };

        setSubmitting(true);

        const moodResult = await postWellnessInputs(mood);
        const energyResult = await postWellnessInputs(energy);
        const socialBatteryResult = await postWellnessInputs(socialBattery);
        const apetiteResult = await postWellnessInputs(apetite);
        const resultInputs: WellnessInputs[] = [moodResult, energyResult, socialBatteryResult, apetiteResult];

        const resultNote = await postWellnessNotes(note);

        // pass data to gpt
        const gptInput = {
            user_profile: {
                name: user.name,
                preferences: [user.hobbies, user.music_taste, user.comfort_foods]
            },
            daily_input: {
                mood: {
                    "1": "angry",
                    "2": "anxious",
                    "3": "sad",
                    "4": "neutral",
                    "5": "happy"
                }[mood.score],
                energy_level: {
                    "1": "exhausted",
                    "2": "tired",
                    "3": "normal",
                    "4": "alert",
                    "5": "energized"
                }[energy.score],
                social_battery: {
                    "1": "drained",
                    "2": "low",
                    "3": "okay",
                    "4": "charged",
                    "5": "full"
                }[socialBattery.score],
                apetite: {
                    "1": "no apetite",
                    "2": "not hungry",
                    "3": "normal",
                    "4": "hungry",
                    "5": "very hungry"
                }[apetite.score],
                additional_note: note.note
            }
        };

        const gptResult = await fetch("http://localhost:8000/app/api/wellness/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(gptInput)
        });

        const gptResultData = await gptResult.json();

        console.log("RAW GPT OUTPUT", gptResultData);

        // format gpt result data to use in components

        const gptRecsFormatted: Recommendations[] = [];

        gptResultData.active_reset.forEach((e: string) => { gptRecsFormatted.push({ user: user.id || 0, day: day.id || 0, category: 1,  recommendation: e}) });
        gptResultData.food.forEach((e: string) => { gptRecsFormatted.push({ user: user.id || 0, day: day.id || 0, category: 2,  recommendation: e}) });
        gptResultData.music.forEach((e: string) => { gptRecsFormatted.push({ user: user.id || 0, day: day.id || 0, category: 3,  recommendation: e}) });
        gptResultData.passive_rest.forEach((e: string) => { gptRecsFormatted.push({ user: user.id || 0, day: day.id || 0, category: 4,  recommendation: e}) });
        gptResultData.productivity.forEach((e: string) => { gptRecsFormatted.push({ user: user.id || 0, day: day.id || 0, category: 5,  recommendation: e}) });
        
        const gptDailyScore: WellnessScores = {
            user: user.id || 0,
            day: day.id || 0,
            wellness_score: Number(gptResultData.daily_score)
        };

        const gptDailyQuote: DailyQuotes = {
            user: user.id || 0,
            day: day.id || 0,
            daily_quote: gptResultData.daily_quote
        };

        // post data to db
        const resultRecommendations: Recommendations[] = await postRecommendationArray(gptRecsFormatted);
        const resultQuote: DailyQuotes = await postDailyQuote(gptDailyQuote);
        const resultScore: WellnessScores = await postWellnessScores(gptDailyScore);
            
        setSubmitting(false);
        onSuccess(resultInputs, resultNote, resultRecommendations, resultQuote, resultScore);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="mood"
                    render={({ field }) => (
                        <FormItem className="mb-6 flex flex-col gap-5">
                            <FormLabel className="text-lg">Mood</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-row justify-between gap-4"
                                >
                                    {moodOptions.map((option, index) => {
                                        const SvgIcon = svgs[index];
                                        return (
                                            <FormItem className="flex flex-col items-center space-y-2" key={option.value}>
                                                <FormControl>
                                                    <RadioGroupItem
                                                        value={option.value}
                                                        id={`mood-${option.value}`}
                                                        className="peer sr-only"
                                                        onClick={() => { setSelectedSvg({ ...selectedSvg, mood: index }) }}
                                                    />
                                                </FormControl>
                                                <label htmlFor={`mood-${option.value}`} className="cursor-pointer">
                                                    <SvgIcon
                                                        className="w-12 h-12"
                                                        style={{
                                                            fill: selectedSvg.mood === index ? svgColors.select : svgColors.base,
                                                            transition: "fill 0.3s ease"
                                                        }}
                                                        onMouseEnter={(e) => e.currentTarget.style.fill = svgColors.hover}
                                                        onMouseLeave={(e) => e.currentTarget.style.fill = selectedSvg.mood === index ? svgColors.select : svgColors.base}
                                                    />
                                                </label>
                                                <FormLabel className="text-sm text-center">{option.label}</FormLabel>
                                            </FormItem>
                                        );
                                    })}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="energy"
                    render={({ field }) => (
                        <FormItem className="mb-6 flex flex-col gap-5">
                            <FormLabel className="text-lg">Energy</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-row justify-between gap-4"
                                >
                                    {energyOptions.map((option, index) => {
                                        const SvgIcon = svgs[index];
                                        return (
                                            <FormItem className="flex flex-col items-center space-y-2" key={option.value}>
                                                <FormControl>
                                                    <RadioGroupItem
                                                        value={option.value}
                                                        id={`energy-${option.value}`}
                                                        className="peer sr-only"
                                                        onClick={() => { setSelectedSvg({ ...selectedSvg, energy: index }) }}
                                                    />
                                                </FormControl>
                                                <label htmlFor={`energy-${option.value}`} className="cursor-pointer">
                                                    <SvgIcon
                                                        className="w-12 h-12"
                                                        style={{
                                                            fill: selectedSvg.energy === index ? svgColors.select : svgColors.base,
                                                            transition: "fill 0.3s ease"
                                                        }}
                                                        onMouseEnter={(e) => e.currentTarget.style.fill = svgColors.hover}
                                                        onMouseLeave={(e) => e.currentTarget.style.fill = selectedSvg.energy === index ? svgColors.select : svgColors.base}
                                                    />                                                
                                                </label>
                                                <FormLabel className="text-sm text-center">{option.label}</FormLabel>
                                            </FormItem>
                                        );
                                    })}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="socialBattery"
                    render={({ field }) => (
                        <FormItem className="mb-6 flex flex-col gap-5 text-lg">
                            <FormLabel className="text-lg">Social Battery</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-row justify-between gap-4"
                                >
                                    {socialBatteryOptions.map((option, index) => {
                                        const SvgIcon = svgs[index];
                                        return (
                                            <FormItem className="flex flex-col items-center space-y-2" key={option.value}>
                                                <FormControl>
                                                    <RadioGroupItem
                                                        value={option.value}
                                                        id={`socialBattery-${option.value}`}
                                                        className="peer sr-only"
                                                        onClick={() => { setSelectedSvg({ ...selectedSvg, socialBattery: index }) }}
                                                    />
                                                </FormControl>
                                                <label htmlFor={`socialBattery-${option.value}`} className="cursor-pointer">
                                                <SvgIcon
                                                        className="w-12 h-12"
                                                        style={{
                                                            fill: selectedSvg.socialBattery === index ? svgColors.select : svgColors.base,
                                                            transition: "fill 0.3s ease"
                                                        }}
                                                        onMouseEnter={(e) => e.currentTarget.style.fill = svgColors.hover}
                                                        onMouseLeave={(e) => e.currentTarget.style.fill = selectedSvg.socialBattery === index ? svgColors.select : svgColors.base}
                                                    />                                                
                                                </label>
                                                <FormLabel className="text-sm text-center">{option.label}</FormLabel>
                                            </FormItem>
                                        );
                                    })}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="apetite"
                    render={({ field }) => (
                        <FormItem className="mb-6 flex flex-col gap-5">
                            <FormLabel className="text-lg">Apetite</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-row justify-between gap-4"
                                >
                                    {apetiteOptions.map((option, index) => {
                                        const SvgIcon = svgs[index];
                                        return (
                                            <FormItem className="flex flex-col items-center space-y-2" key={option.value}>
                                                <FormControl>
                                                    <RadioGroupItem
                                                        value={option.value}
                                                        id={`apetite-${option.value}`}
                                                        className="peer sr-only"
                                                        onClick={() => { setSelectedSvg({ ...selectedSvg, apetite: index }) }}
                                                    />
                                                </FormControl>
                                                <label htmlFor={`apetite-${option.value}`} className="cursor-pointer">
                                                <SvgIcon
                                                        className="w-12 h-12"
                                                        style={{
                                                            fill: selectedSvg.apetite === index ? svgColors.select : svgColors.base,
                                                            transition: "fill 0.3s ease"
                                                        }}
                                                        onMouseEnter={(e) => e.currentTarget.style.fill = svgColors.hover}
                                                        onMouseLeave={(e) => e.currentTarget.style.fill = selectedSvg.apetite === index ? svgColors.select : svgColors.base}
                                                    />                                                
                                                </label>
                                                <FormLabel className="text-sm text-center">{option.label}</FormLabel>
                                            </FormItem>
                                        );
                                    })}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="note"
                    render={({ field }) => (
                        <FormItem className="mb-6">
                            <FormLabel>Note</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Write anything you'd like to reflect on..."
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={submitting}>
                    {submitting ? "Submitting..." : "Submit"}
                </Button>
            </form>
        </Form>
    );
}