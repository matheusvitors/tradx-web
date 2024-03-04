import { Store } from "@/application/interfaces";
import { LocalStorageStore } from "@/infra/store";

export const storage: Store = LocalStorageStore;
