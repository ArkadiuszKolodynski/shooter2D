import { PlayerSignalData } from '@shooter2D/shared/interfaces';
import { SignalData } from 'simple-peer';

export class PlayerSignalDataDto implements PlayerSignalData {
  serverId: string;
  data: SignalData;
}
