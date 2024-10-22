import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownAction } from '../../models/dropdownAction.model';
import { DropdownComponent } from '../dropdown/dropdown.component';

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;

  // Mock data
  const mockActions: DropdownAction[] = [
    { name: 'Editar', action: () => {} },
    { name: 'Eliminar', action: () => {} }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.activeDropdown).toBeFalsy();
    expect(component.identify).toBe('0');
    expect(component.idProduct).toBe('0');
    expect(component.listActions).toEqual([]);
  });

  it('should accept input values', () => {
    component.activeDropdown = true;
    component.identify = '1';
    component.idProduct = '1';
    component.listActions = mockActions;
    fixture.detectChanges();

    expect(component.activeDropdown).toBeTruthy();
    expect(component.identify).toBe('1');
    expect(component.idProduct).toBe('1');
    expect(component.listActions).toEqual(mockActions);
  });

  describe('toggleDropdown', () => {
    it('should toggle dropdown when identify matches idProduct', () => {
      // Setup
      component.identify = '1';
      component.idProduct = '1';
      component.activeDropdown = false;

      // Act
      component.toggleDropdown();

      // Assert
      expect(component.activeDropdown).toBeTruthy();

      // Act again
      component.toggleDropdown();

      // Assert
      expect(component.activeDropdown).toBeFalsy();
    });

    it('should always set to true when identify does not match idProduct', () => {
      // Setup
      component.identify = '1';
      component.idProduct = '2';
      component.activeDropdown = false;

      // Act
      component.toggleDropdown();

      // Assert
      expect(component.activeDropdown).toBeTruthy();

      // Act again
      component.toggleDropdown();

      // Assert
      expect(component.activeDropdown).toBeTruthy();
    });
  });


});