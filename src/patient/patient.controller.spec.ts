import { Test, TestingModule } from "@nestjs/testing";
import { PatientController } from "./patient.controller";
import { PatientService } from "./patient.service";
import { Patient, CreatePatientDto, UpdatePatientDto, QueryPatientDto } from "./patient.entity";

describe("PatientController", () => {
    let controller: PatientController;
    let service: PatientService;

    const mockPatient: Patient = {
        id: 1,
        firstName: "Joe la frite",
        lastName: "patatipataat",
        ssn: "123456789123456",
        dob: new Date("1990-01-01"),
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    const mockPatientService = {
        findAll: jest.fn(),
        findById: jest.fn(),
        findByQuery: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PatientController],
            providers: [
                {
                    provide: PatientService,
                    useValue: mockPatientService,
                },
            ],
        }).compile();

        controller = module.get<PatientController>(PatientController);
        service = module.get<PatientService>(PatientService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });

    describe("findAll", () => {
        it("should return an array of patients", async () => {
            jest.spyOn(service, "findAll").mockResolvedValue([mockPatient]);
            const result = await controller.findAll();
            expect(service.findAll).toHaveBeenCalled();
            expect(result).toEqual([mockPatient]);
        });

        it("should return null if no patients found", async () => {
            jest.spyOn(service, "findAll").mockResolvedValue(null);
            const result = await controller.findAll();
            expect(service.findAll).toHaveBeenCalled();
            expect(result).toBeNull();
        });
    });

    describe("findById", () => {
        it("should return a patient if found", async () => {
            jest.spyOn(service, "findById").mockResolvedValue(mockPatient);
            const result = await controller.findById(1);
            expect(service.findById).toHaveBeenCalledWith(1);
            expect(result).toEqual(mockPatient);
        });

        it("should return null if no patient found", async () => {
            jest.spyOn(service, "findById").mockResolvedValue(null);
            const result = await controller.findById(99);
            expect(service.findById).toHaveBeenCalledWith(99);
            expect(result).toBeNull();
        });
    });

    describe("findBy", () => {
        it("should return patients matching the query", async () => {
            const query: QueryPatientDto = { firstName: "John" };
            jest.spyOn(service, "findByQuery").mockResolvedValue([mockPatient]);
            const result = await controller.findBy(query);
            expect(service.findByQuery).toHaveBeenCalledWith(query);
            expect(result).toEqual([mockPatient]);
        });
    });

    describe("create", () => {
        it("should create and return a patient", async () => {
            const dto: CreatePatientDto = {
                firstName: "John",
                lastName: "Doe",
                ssn: "123-45-6789",
                dob: new Date("1990-01-01"),
            };
            jest.spyOn(service, "create").mockResolvedValue(mockPatient);
            const result = await controller.create(dto);
            expect(service.create).toHaveBeenCalledWith(dto);
            expect(result).toEqual(mockPatient);
        });
    });

    describe("update", () => {
        it("should update and return the patient", async () => {
            const dto: UpdatePatientDto = { firstName: "UpdatedName" } as UpdatePatientDto;
            jest.spyOn(service, "update").mockResolvedValue({ ...mockPatient, ...dto });
            const result = await controller.update(1, dto);
            expect(service.update).toHaveBeenCalledWith(1, dto);
            expect(result).toEqual({ ...mockPatient, ...dto });
        });

        it("should return null if patient not found", async () => {
            const dto: UpdatePatientDto = { firstName: "UpdatedName" } as UpdatePatientDto;
            jest.spyOn(service, "update").mockResolvedValue(null);
            const result = await controller.update(99, dto);
            expect(service.update).toHaveBeenCalledWith(99, dto);
            expect(result).toBeNull();
        });
    });

    describe("remove", () => {
        it("should delete the patient and return it", async () => {
            jest.spyOn(service, "remove").mockResolvedValue(mockPatient);
            const result = await controller.remove(1);
            expect(service.remove).toHaveBeenCalledWith(1);
            expect(result).toEqual(mockPatient);
        });

        it("should return null if patient not found", async () => {
            jest.spyOn(service, "remove").mockResolvedValue(null);
            const result = await controller.remove(99);
            expect(service.remove).toHaveBeenCalledWith(99);
            expect(result).toBeNull();
        });
    });
});
