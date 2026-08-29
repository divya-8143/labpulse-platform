from fastapi import HTTPException, status

class MedicalPlatformException(HTTPException):
    def __init__(self, status_code: int, detail: str, error_code: str = "ERROR"):
        super().__init__(status_code=status_code, detail={"message": detail, "code": error_code})

class NotFoundException(MedicalPlatformException):
    def __init__(self, resource: str, identifier: str = ""):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"{resource} {identifier} not found" if identifier else f"{resource} not found",
            error_code="NOT_FOUND"
        )

class UnauthorizedException(MedicalPlatformException):
    def __init__(self, detail: str = "Could not validate credentials"):
        super().__init__(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=detail,
            error_code="UNAUTHORIZED"
        )

class ForbiddenException(MedicalPlatformException):
    def __init__(self, detail: str = "Insufficient permissions to perform this action"):
        super().__init__(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=detail,
            error_code="FORBIDDEN"
        )

class ValidationException(MedicalPlatformException):
    def __init__(self, detail: str):
        super().__init__(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=detail,
            error_code="VALIDATION_FAILED"
        )

class ProcessingException(MedicalPlatformException):
    def __init__(self, detail: str):
        super().__init__(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=detail,
            error_code="EXTRACTION_PROCESSING_FAILED"
        )
