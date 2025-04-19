import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { postUsers } from "@/api/users_api";
import { Users } from "@/interfaces/Users";

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Field cannot be empty."
    }),
    collegeMajor: z.string(),
    collegeYear: z.string(),
    age: z.string(),
    gender: z.string(),
    hobbies: z.string(),
    comfortFoods: z.string(),
    musicTaste: z.string()
});

export default function NewUserForm({ onSuccess }: { onSuccess: (user: Users) => void }) {
    const [submitting, setSubmitting] = useState<boolean>();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            collegeMajor: "",
            collegeYear: "",
            age: "",
            gender: "",
            hobbies: "",
            comfortFoods: "",
            musicTaste: ""
        }
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const user: Users = {
            name: values.name,
            college_major: values.collegeMajor,
            college_year: values.collegeYear,
            age: Number(values.age),
            gender: values.gender,
            hobbies: values.hobbies,
            comfort_foods: values.comfortFoods,
            music_taste: values.musicTaste
        };

        setSubmitting(true);
        const newUser = await postUsers(user);
        setSubmitting(false);

        onSuccess(newUser);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    disabled={submitting}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>What's your name?</FormLabel>
                            <FormControl>
                                <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is how I will refer to you going forward.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="collegeMajor"
                    disabled={submitting}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>What is your college major?</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. Computer Science" {...field} />
                            </FormControl>
                            <FormDescription>
                                Tell me what you're studying!
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="collegeYear"
                    disabled={submitting}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>What is your college year?</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. Sophomore, Fourth, etc." {...field} />
                            </FormControl>
                            <FormDescription>
                                Helps me understand where you are in your journey.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="age"
                    disabled={submitting}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>What is your age?</FormLabel>
                            <FormControl>
                                <Input placeholder="Your age" {...field} />
                            </FormControl>
                            <FormDescription>
                                Just for context — no judgment!
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="gender"
                    disabled={submitting}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>What is your gender?</FormLabel>
                            <FormControl>
                                <Input placeholder="Your gender" {...field} />
                            </FormControl>
                            <FormDescription>
                                Share what you're comfortable with.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="hobbies"
                    disabled={submitting}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>What are some of your hobbies?</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. Reading, gaming, climbing" {...field} />
                            </FormControl>
                            <FormDescription>
                                This helps me personalize your check-ins.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="comfortFoods"
                    disabled={submitting}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>What are some of your comfort foods?</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. Pizza, sushi, mac & cheese" {...field} />
                            </FormControl>
                            <FormDescription>
                                Good vibes only 🍕🍣
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="musicTaste"
                    disabled={submitting}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>What is your music taste like?</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. Indie, jazz, classic rock" {...field} />
                            </FormControl>
                            <FormDescription>
                                I’d love to know what you’re vibing to 🎵
                            </FormDescription>
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