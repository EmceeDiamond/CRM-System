//import memoize from 'memoize';
import { IAsyncParticle } from '../Types/Interfase';
//import { ActionReducerMapBuilder, Draft, AsyncThunk } from '@reduxjs/toolkit';

export const initAsyncParticle = <T>(data: T | undefined = undefined): IAsyncParticle<T> => ({
    data,
    error: undefined,
    errorCounter: 0,
    status: 'idle'
})

// export const addAsyncBuilderCases = <TState extends TaskState, TArgs, TResult, TReject>(
//     builder: ActionReducerMapBuilder<TState>,
//     sliceMethod: AsyncThunk<TResult, TArgs, { rejectValue: TReject }>,
//     key: keyof TState,
//     ) => {
//     builder.addCase(sliceMethod.pending, (state: Draft<TState>) => {
//         const stateSlice = state[key as keyof Draft<TState>] as Draft<IAsyncParticle<unknown>>;
//         stateSlice.status = 'pending';
//         console.log(stateSlice.status)
//     });
//     builder.addCase(sliceMethod.fulfilled, (state: Draft<TState>, action) => {
//         const stateSlice = state[key as keyof Draft<TState>] as Draft<IAsyncParticle<unknown>>;
//         stateSlice.status = 'fulfilled';
//         stateSlice.errorCounter = 0;
//         stateSlice.data = action.payload;
//         //state.taskCountsByStatus = action.payload
//         console.log(stateSlice.status, stateSlice.data)
//     });
//     builder.addCase(sliceMethod.rejected, (state: Draft<TState>, action) => {
//         const stateSlice = state[key as keyof Draft<TState>] as Draft<IAsyncParticle<unknown>>;
//         stateSlice.error = action.payload;
//         console.log(stateSlice.error)
//         stateSlice.errorCounter = (stateSlice.errorCounter ?? 0) + 1;
//         stateSlice.status = 'rejected';
//         console.log(stateSlice.status)
//     });
// }

// export const getAsyncDataStatus = memoize((data: IAsyncParticle<unknown>): IAsyncDataStatus => ({
//     hasError: data?.status === 'rejected',
//     isIdle: data?.status === 'idle',
//     isLoading: data?.status === 'pending',
//     isLoadingOrIdle: data?.status === 'pending' || data?.status === 'idle',
//     isLoaded: data?.status === 'fulfilled',
//     isLoadedOrError: data?.status === 'fulfilled' || data?.status === 'rejected'
// }))

// export const getAsyncRequestData = memoize(
//     <T>(stateParam: IAsyncParticle<T>): { errorCounter: number | undefined; data: T | undefined; error: unknown | null | undefined; status: IAsyncDataStatus } => ({
//     data: stateParam?.data,
//     error: stateParam?.error,
//     errorCounter: stateParam?.errorCounter,
//     status: getAsyncDataStatus(stateParam)
// }))