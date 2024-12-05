import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { Question, Team } from '../types';
import {
    createOption,
    createQuestion,
    updateOptions,
    updateQuestion
} from '../services/questions';

const questionSchema = z.object({
    text: z.string().min(1, 'Question text is required'),
    team_id: z.string().min(1, 'Team is required'),
    options: z.array(z.string()).min(2, 'At least 2 options are required'),
    correctOption: z.preprocess((val) => Number(val), z.number().min(0, 'Correct option is required')),
});

type QuestionFormData = z.infer<typeof questionSchema>;

interface QuestionFormProps {
    question: Question | null;
    teams: Team[];
    onClose: () => void;
    onSubmit: () => void;
}

export default function QuestionForm({ question, teams, onClose, onSubmit }: QuestionFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
        watch,
    } = useForm<QuestionFormData>({
        resolver: zodResolver(questionSchema),
        defaultValues: question
            ? {
                text: question.text,
                team_id: String(question.team_id),
                options: question.options,
                correctOption: question.correctOption,
            }
            : {
                text: '',
                team_id: '',
                options: ['', ''],
                correctOption: 0,
            },
    });
    if(Object.keys(errors).length > 0)
        console.warn("Validation errors:", errors);
    const options = watch('options') || [];
    //const correctOption = watch('correctOption');

    const onSubmitForm = async (data: QuestionFormData) => {
        try {
            // Filter options to only include those with IDs less than or equal to correctOption

            if (question) {
                await updateOptions(question.id, data.options, data.correctOption);

                await updateQuestion(question.id, {
                    text: data.text,
                    team_id: parseInt(data.team_id),
                });
            } else {
                const createdQuestion = await createQuestion({
                    text: data.text,
                    team_id: parseInt(data.team_id),
                });

                for (let i = 0; i < data.options.length; i++) {
                    await createOption(createdQuestion.id, data.options[i], i === data.correctOption);
                }
            }
            onSubmit();
        } catch (error) {
            console.error('Error during submission:', error);
        }
    };

    const addOption = () => {
        const currentOptions = watch('options') || [];
        setValue('options', [...currentOptions, '']);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-2xl">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-bold text-gray-800">
                        {question ? 'Edit Question' : 'Add New Question'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmitForm)} className="p-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Question Text</label>
                        <textarea
                            {...register('text')}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            rows={3}
                        />
                        {errors.text && (
                            <p className="mt-1 text-sm text-red-600">{errors.text.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Team</label>
                        <select
                            {...register('team_id')}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                            <option value="">Select a team</option>
                            {teams.map((team) => (
                                <option key={team.id} value={team.id}>
                                    {team.name}
                                </option>
                            ))}
                        </select>
                        {errors.team_id && (
                            <p className="mt-1 text-sm text-red-600">{errors.team_id.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
                        {options.map((_, index) => (
                            <div key={index} className="mb-2">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        {...register('correctOption')}
                                        value={index}
                                        className="w-4 h-4 text-blue-600"
                                        checked={watch('correctOption') === index}
                                        onChange={() => setValue('correctOption', Number(index), {shouldValidate: true})}
                                    />
                                    <input
                                        {...register(`options.${index}`)}
                                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        placeholder={`Option ${index + 1}`}
                                    />
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addOption}
                            className="mt-2 text-sm text-blue-600 hover:text-blue-700"
                        >
                            + Add Option
                        </button>
                        {errors.options && (
                            <p className="mt-1 text-sm text-red-600">{errors.options.message}</p>
                        )}
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 hover:text-gray-900"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                        >
                            {isSubmitting ? 'Saving...' : question ? 'Update Question' : 'Add Question'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}