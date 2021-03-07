export const calculateActiveCases = (cumCases: number, cumRecoveredCases: number, cumDeathCases: number)=> {
    return (cumCases - cumRecoveredCases - cumDeathCases);
}