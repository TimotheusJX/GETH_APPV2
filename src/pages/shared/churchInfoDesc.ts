export class ChurchInfoDesc {
    headerImage: string;
    circularImage: string;
    churchName: string;
    worshipPlace: string;
    worshipLocation: string;
    worshipTiming: string;
    email: string;
    phoneChurchOffice: string;
    whatsapp: string;
    churchOfficeAddress: string;
    worshipPlaceAddress: string;
    churchSessionAndStaff: [{
        front: {image: string, title: string, subtitle: string},
        back: {title: string, subtitle: string, content: string}
    }];
    churchStaffHeaderImage: string;
}