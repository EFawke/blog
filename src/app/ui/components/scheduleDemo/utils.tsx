export const defaultReactions = [
    { name: "Fulleroferrocene", runs: 99 },
    { name: "PPD Fullerene Fibers", runs: 100 },
    { name: "Lanthanum Metallofullerene", runs: 118 },
    { name: "Fullerene Intercalated Graphite", runs: 196 },
    { name: "Methanofullerene", runs: 226 },
    { name: "Graphene Nanoribbons", runs: 236 },
    { name: "Scandium Metallofullerene", runs: 609 },
    { name: "Carbon-86 Epoxy Resin", runs: 834 },
]

export interface ReactionType {
    name: string,
    runs: number
}

export async function runScheduleAlgorithm(
    numAboveMean: number,
    sortedReactions: ReactionType[],
    meanRuns: number,
    slots: number,
    setIterationCounter: React.Dispatch<React.SetStateAction<number>>,
    iterationCounter: number,
    setStatus: (status: "Ready" | "Running" | "Done" | "Paused") => void,
    setPercentageStep: (percentageStep: number) => void,
    setIsPaused: (isPaused: boolean) => void,
    isPaused: boolean,
    setSlots: (slots: ReactionType[]) => void,
    setNumSlots: (numSlots: number) => void,
    stepDelay: number | null
    
    ) {
    setIterationCounter((prev: number) => prev + 1);
    setStatus("Running")
    setIsPaused(false)
    setPercentageStep(numAboveMean)
    const schedule = [];
    let availableSlots = slots;
    const meanRunsPlusX = meanRuns + numAboveMean;
    for (let i = 0; i < sortedReactions.length; i++) {
        const numberOfInitialRuns = Math.floor(sortedReactions[i].runs / meanRunsPlusX);
        const numberLeftOver = sortedReactions[i].runs - (meanRunsPlusX * numberOfInitialRuns);

        for (let j = 0; j < numberOfInitialRuns; j++) {
            schedule.push({
                name: sortedReactions[i].name,
                runs: meanRunsPlusX,
            });
            availableSlots -= 1;
            setSlots(schedule)
            setNumSlots(availableSlots)
            setSlots(schedule)
            setNumSlots(availableSlots)
            if (stepDelay) {
                await new Promise(resolve => setTimeout(resolve, stepDelay));
            }
        }

        if (sortedReactions[i].runs % meanRunsPlusX !== 0) {
            schedule.push({
                name: sortedReactions[i].name,
                runs: numberLeftOver,
            });
            availableSlots -= 1;
            setSlots(schedule)
            setNumSlots(availableSlots)

            if (stepDelay) {
                await new Promise(resolve => setTimeout(resolve, stepDelay));
            }
        }
    }

    if (availableSlots >= 0) {
        setStatus("Done")
        setIsPaused(false)
        return { success: true, schedule };
    } else {
        return { success: false, schedule: null };
    }
}

export async function scheduleReactions(

    reactions: ReactionType[],
    slots: number,
    setSlots: (array: ReactionType[]) => void,
    setNumSlots: (numSlots: number) => void,
    setStatus: (status: "Ready" | "Running" | "Done" | "Paused") => void,
    setIsPaused: (isPaused: boolean) => void,
    setIterationCounter: React.Dispatch<React.SetStateAction<number>>,
    iterationCounter: number,
    setPercentageStep: (percentageStep: number) => void,
    isPaused: boolean,
    stepDelay: number | null

) {

    if (slots > 1000) {
        slots = 1000; // Safety cap
    }

    if (slots <= reactions.length) {
        setSlots(reactions)
        setNumSlots(0)
        setStatus("Done");
        setIsPaused(false);
        return;
    }

    const sortedReactions = reactions.sort((a, b) => a.runs - b.runs);
    const reacRunsSum = sortedReactions.reduce((acc, curr) => acc + Number(curr.runs), 0);
    const meanRuns = Math.ceil(reacRunsSum / slots);

    let numAboveMean = 1;
    let lastFail = 0;
    let lastSuccess = null;

    while (true) {
        const { success } = await runScheduleAlgorithm(
            numAboveMean, 
            sortedReactions, 
            meanRuns, 
            slots,
            setIterationCounter,
            iterationCounter,
            setStatus,
            setPercentageStep,
            setIsPaused,
            isPaused,
            setSlots,
            setNumSlots,
            stepDelay
        );

        if (success) {
            lastSuccess = numAboveMean;
            break;
        } else {
            lastFail = numAboveMean;
            numAboveMean *= 2; // exponential

            if (numAboveMean > reacRunsSum) {
                lastSuccess = reacRunsSum;
                break;
            }
        }
    }

    let low = lastFail
    let high = lastSuccess;

    while (low < high) {
        const mid = Math.floor((low + high) / 2);
        const { success } = await runScheduleAlgorithm(
            numAboveMean, 
            sortedReactions, 
            meanRuns, 
            slots,
            setIterationCounter,
            iterationCounter,
            setStatus,
            setPercentageStep,
            setIsPaused,
            isPaused,
            setSlots,
            setNumSlots,
            stepDelay
        );

        if (success) {
            high = mid;
        } else {
            low = mid + 1;
        }
    }
}