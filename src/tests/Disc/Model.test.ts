import DiskModel from '../../models/DisksModel';
import { IDisk } from './../../interfaces/IDisks';
import mongoose from 'mongoose';



describe('DiskModel', () => {
    let disk: IDisk;
    let diskModel: DiskModel;

    beforeAll(() => {
        mongoose.connect('mongodb+srv://Alector:BRma0OxmWerHtPWe@discopedy.o63qtdk.mongodb.net/?retryWrites=true&w=majority' , {});
    });

    afterAll(() => {
        mongoose.disconnect();
    });

    beforeEach(() => {
        disk = {
            title: 'Test Title',
            details: {
                Caracteristica: 'Test Caracteristica',
                Formatos: 'Test Formatos',
                Gravadora: 'Test Gravadora',
                Lancamento: 1880,
                Observacao: 'Test Observacao',
                Produtor: 'Test Produtor',
            },
            artist: 'Test Artist',
            musics: ['Test Music 1', 'Test Music 2'],
            url_img: 'Test URL',
            album_link: 'www.youtube.com.br',
            created: new Date(),
            updated: new Date(),
        };

        diskModel = new DiskModel();
    });

    it('should save a disk', async () => {
        const savedDisk = await diskModel.create(disk);
        expect(savedDisk).toMatchObject(disk);
    });

    it('should find all disks', async () => {
        const { length } = await diskModel.read();
        await diskModel.create(disk);
        const disks = await diskModel.read();
        expect(disks).toHaveLength(1 + length);
    });

    it('should find a disk by id', async () => {
        const savedDisk = await diskModel.create(disk);
        const foundDisk = await diskModel.readOne(savedDisk._id || 'blabla');
        expect(foundDisk).toMatchObject(disk);
    });


    it('should delete a disk by id', async () => {
        const { length } = await diskModel.read();
        const savedDisk = await diskModel.create(disk);
        const deletedDisk = await diskModel.delete(savedDisk._id || 'blabla');
        expect(deletedDisk).toMatchObject(disk);
        const disks = await diskModel.read();
        expect(disks).toHaveLength(length - 1);
    });
});
