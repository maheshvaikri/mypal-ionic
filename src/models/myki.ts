export namespace Myki {
    export class Account {
        holder: string;
        cards: Array<Card>;

        constructor() {
            this.cards = []
        }
    }

    export class Card {
        loaded: boolean = false;
        transactionLoaded: boolean = false;
        holder: string;
        id: string;
        type: CardType;
        expiry: Date;
        status: CardStatus;
        moneyBalance: number;
        moneyTopupInProgress: number;
        moneyTotalBalance: number;
        passActive: string;
        passInactive: string;
        lastTransactionDate: Date;
        autoTopup: boolean;
        transactions: Array<Transaction>;

        constructor() {
            this.transactions = []
        }

        idFormatted(): string {
            return `${this.id.substr(0, 1)} ${this.id.substr(1, 5)} ${this.id.substr(6, 4)} ${this.id.substr(10, 4)} ${this.id.substr(14, 1)}`
        }

        setType(type: string) {
            switch (type) {
                case 'Full Fare':
                    this.type = CardType.FullFare;
                    break;
                case 'Concession':
                    this.type = CardType.Concession;
                    break;
                case 'Children':
                    this.type = CardType.Children;
                    break;
                case 'Seniors':
                    this.type = CardType.Seniors;
                    break;
                default:
                    throw new Error('Invalid card type')
            }
        }

        typeToString(): string {
            switch (this.type) {
                case CardType.FullFare:
                    return "Full fare";
                case CardType.Concession:
                    return "Concession";
                case CardType.Children:
                    return "Children";
                case CardType.Seniors:
                    return "Seniors";
                default:
                    return '';
            }
        }
    }

    export class Transaction {
        dateTime: Date;
        type: TransactionType;
        service: TransactionService;
        zone: string;
        description: string;
        credit: number;
        debit: number;
        moneyBalance: number;

        setType(type: string) {
            switch (type) {
                case 'Touch on':
                    this.type = TransactionType.TouchOn;
                    break;
                case 'Touch off':
                    this.type = TransactionType.TouchOff;
                    break;
                case 'Touch off (Default Fare)':
                    this.type = TransactionType.TouchOffDefaultFare;
                    break;
                case 'Top up myki pass':
                    this.type = TransactionType.TopUpPass;
                    break;
                case 'Top up myki money':
                    this.type = TransactionType.TopUpMoney;
                    break;
                default:
                    throw new Error('Invalid transaction type')
            }
        }

        typeToString(): string {
            switch (this.type) {
                case TransactionType.TouchOn:
                    return "Touch on";
                case TransactionType.TouchOff:
                    return "Touch off";
                case TransactionType.TouchOffDefaultFare:
                    return "Touch off (default fare)";
                case TransactionType.TopUpPass:
                case TransactionType.TopUpMoney:
                    return "Top up";
                default:
                    return '';
            }
        }

        setService(service: string) {
            switch (service) {
                case 'Bus':
                    this.service = TransactionService.Bus;
                    break;
                case 'Train':
                    this.service = TransactionService.Train;
                    break;
                case 'Tram':
                    this.service = TransactionService.Tram;
                    break;
                case 'Auto top up':
                    this.service = TransactionService.AutoTopUp;
                    break;
                case 'Website':
                    this.service = TransactionService.Website;
                    break;
                default:
                    throw new Error('Invalid transaction service')
            }
        }

        serviceToString(): string {
            switch (this.service) {
                case TransactionService.Bus:
                    return 'Bus';
                case TransactionService.Train:
                    return 'Train';
                case TransactionService.Tram:
                    return 'Tram';
                case TransactionService.AutoTopUp:
                    return 'Auto top up';
                case TransactionService.Website:
                    return 'Website';
                default:
                    return '';
            }
        }
    }

    export enum CardType {
        FullFare,
        Concession,
        Children,
        Seniors
    }

    export enum CardStatus {
        Active,
        Replaced
    }

    export enum TransactionType {
        TouchOn,
        TouchOff,
        TouchOffDefaultFare,
        TopUpPass,
        TopUpMoney
    }

    export enum TransactionService {
        Bus,
        Train,
        Tram,

        AutoTopUp,
        Website,
    }
}