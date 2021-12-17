type ISO8601String = string;

export type RawShard = {
	Name: string;
	Start: ISO8601String;
	End: ISO8601String;
	Entries: number;
	Size: number;
	Cold: boolean;
	RemoteState?: {
		UUID: string;
		Entries: number;
		Size: number;
	};
};
