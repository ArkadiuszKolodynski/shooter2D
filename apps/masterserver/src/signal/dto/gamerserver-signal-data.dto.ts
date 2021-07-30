import { GameserverSignalData } from '@shooter2D/shared/interfaces/gameserver-signal-data.interface';
import { SignalData } from 'simple-peer';

export class GameserverSignalDataDto implements GameserverSignalData {
  playerId: string;
  data: SignalData;
}
