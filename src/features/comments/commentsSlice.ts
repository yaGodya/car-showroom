import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Review } from "../../types/types";
import { RootState } from "../../app/store";

const STORAGE_KEY = "car_showroom_user_comments";

function loadCommentsFromStorage(): Record<string, Review[]> {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : {};
    } catch {
        return {};
    }
}

interface CommentsState {
    byVehicleId: Record<string, Review[]>;
}

const initialState: CommentsState = {
    byVehicleId: loadCommentsFromStorage(),
};

export const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        addComment: (
            state,
            action: PayloadAction<{ vehicleId: string; comment: Review }>,
        ) => {
            const { vehicleId, comment } = action.payload;
            if (!state.byVehicleId[vehicleId]) {
                state.byVehicleId[vehicleId] = [];
            }
            state.byVehicleId[vehicleId].unshift(comment);

            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(state.byVehicleId));
            } catch (error) {
                console.error("Не вдалося зберегти коментар у localStorage", error);
            }
        },
    },
});

export const { addComment } = commentsSlice.actions;

export const selectCommentsByVehicleId = (
    state: RootState,
    vehicleId?: string,
): Review[] => {
    if (!vehicleId) return [];
    return state.comments.byVehicleId[vehicleId] ?? [];
};

export default commentsSlice.reducer;
