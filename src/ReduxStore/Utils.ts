import { IAsyncParticle } from '../Types/types';
import { ActionReducerMapBuilder, Draft, AsyncThunk } from '@reduxjs/toolkit';

export const initAsyncParticle = <T>(data: T | undefined = undefined): IAsyncParticle<T> => ({
    data,
    error: undefined,
    errorCounter: 0,
    status: 'idle'
})

export const addAsyncBuilderCases = <TState, TResult, TArgs, TReject>(
    builder: ActionReducerMapBuilder<TState>,
    sliceMethod: AsyncThunk<TResult, TArgs, { rejectValue: TReject }>,
    key: keyof TState
    ) => {
    builder.addCase(sliceMethod.pending, (state: Draft<TState>) => {
        const stateSlice = state[key as keyof Draft<TState>] as Draft<IAsyncParticle<unknown>>;
        stateSlice.status = 'pending';
    });
    builder.addCase(sliceMethod.fulfilled, (state: Draft<TState>, action) => {
        const stateSlice = state[key as keyof Draft<TState>] as Draft<IAsyncParticle<unknown>>;
        stateSlice.status = 'fulfilled';
        stateSlice.errorCounter = 0;
        stateSlice.data = action.payload;
        console.log(stateSlice.data)
    });
    builder.addCase(sliceMethod.rejected, (state: Draft<TState>, action) => {
        const stateSlice = state[key as keyof Draft<TState>] as Draft<IAsyncParticle<unknown>>;
        stateSlice.error = action.payload;
        stateSlice.errorCounter = (stateSlice.errorCounter ?? 0) + 1;
        stateSlice.status = 'rejected';
    });
}