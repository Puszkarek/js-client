import { boolean, iso8601, number, object, optional, string } from 'decoders';

export const shardDecoder = object({
	Name: string,
	Start: iso8601,
	End: iso8601,
	Entries: number,
	Size: number,
	Cold: boolean,
	RemoteState: optional(
		object({
			UUID: string,
			Entries: number,
			Size: number,
		}),
	),
});
