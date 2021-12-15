export type Shard = {
	Name: string;
	Start: Date;
	End: Date;
	Entries: number;
	Size: number;
	Cold: boolean;
	RemoteState?: {
		UUID: string;
		Entries: number;
		Size: number;
	};
};
