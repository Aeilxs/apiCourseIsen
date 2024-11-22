import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PatientService } from "./patient.service";
import { Patient, UpdatePatientDto } from "./patient.entity";

describe("PatientService", () => {
    let service: PatientService;
    let repo: Repository<Patient>;

    const mockPatient: Patient = {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        ssn: "123456789123456",
        dob: new Date("1990-01-01"),
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    const mockRepository = {
        findOneBy: jest.fn(),
        find: jest.fn(),
        findBy: jest.fn(),
        save: jest.fn(),
        delete: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PatientService,
                {
                    provide: getRepositoryToken(Patient),
                    useValue: mockRepository,
                },
            ],
        }).compile();

        service = module.get<PatientService>(PatientService);
        repo = module.get<Repository<Patient>>(getRepositoryToken(Patient));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    describe("findById", () => {
        it("should return a patient if found", async () => {
            jest.spyOn(repo, "findOneBy").mockResolvedValue(mockPatient);
            const result = await service.findById(1);
            expect(repo.findOneBy).toHaveBeenCalledWith({ id: 1 });
            expect(result).toEqual(mockPatient);
        });

        it("should return null if no patient is found", async () => {
            jest.spyOn(repo, "findOneBy").mockResolvedValue(null);
            const result = await service.findById(99);
            expect(repo.findOneBy).toHaveBeenCalledWith({ id: 99 });
            expect(result).toBeNull();
        });
    });

    describe("findAll", () => {
        it("should return all patients", async () => {
            jest.spyOn(repo, "find").mockResolvedValue([mockPatient]);
            const result = await service.findAll();
            expect(repo.find).toHaveBeenCalled();
            expect(result).toEqual([mockPatient]);
        });
    });

    describe("create", () => {
        it("should create and return a new patient", async () => {
            jest.spyOn(repo, "save").mockResolvedValue(mockPatient);
            const result = await service.create({
                firstName: "John",
                lastName: "Doe",
                ssn: "123-45-6789",
                dob: new Date("1990-01-01"),
            });
            expect(repo.save).toHaveBeenCalledWith({
                firstName: "John",
                lastName: "Doe",
                ssn: "123-45-6789",
                dob: new Date("1990-01-01"),
            });
            expect(result).toEqual(mockPatient);
        });
    });

    describe("update", () => {
        it("should update and return the patient", async () => {
            jest.spyOn(service, "findById").mockResolvedValue(mockPatient);
            jest.spyOn(repo, "save").mockResolvedValue({
                ...mockPatient,
                firstName: "UpdatedName",
            });
            const result = await service.update(1, {
                firstName: "UpdatedName",
            } as UpdatePatientDto);
            expect(service.findById).toHaveBeenCalledWith(1);
            expect(repo.save).toHaveBeenCalledWith({
                ...mockPatient,
                firstName: "UpdatedName",
                updatedAt: expect.any(Date),
            });
            expect(result).toEqual({
                ...mockPatient,
                firstName: "UpdatedName",
                updatedAt: expect.any(Date),
            });
        });

        it("should return null if patient is not found", async () => {
            jest.spyOn(service, "findById").mockResolvedValue(null);
            const result = await service.update(99, {
                firstName: "UpdatedName",
            } as UpdatePatientDto);
            expect(service.findById).toHaveBeenCalledWith(99);
            expect(result).toBeNull();
        });
    });

    describe("remove", () => {
        it("should delete the patient and return it", async () => {
            jest.spyOn(service, "findById").mockResolvedValue(mockPatient);
            const result = await service.remove(1);
            expect(service.findById).toHaveBeenCalledWith(1);
            expect(repo.delete).toHaveBeenCalledWith({ id: 1 });
            expect(result).toEqual(mockPatient);
        });

        it("should return null if patient is not found", async () => {
            jest.spyOn(service, "findById").mockResolvedValue(null);
            const result = await service.remove(99);
            expect(service.findById).toHaveBeenCalledWith(99);
            expect(result).toBeNull();
        });
    });
});
